import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для работы с профилями игроков: получение топа, профиля по ID и регистрация'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(dsn)
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            user_id = query_params.get('id')
            
            if user_id:
                return get_profile(conn, user_id)
            else:
                return get_top_players(conn)
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            return register_user(conn, body)
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        conn.close()


def get_top_players(conn) -> dict:
    '''Получение топа игроков'''
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute('''
            SELECT 
                u.id,
                u.username,
                u.avatar_emoji,
                pp.level,
                pp.rating,
                pp.wins,
                pp.losses,
                pp.rank_position
            FROM users u
            JOIN player_profiles pp ON u.id = pp.user_id
            ORDER BY pp.rating DESC
            LIMIT 10
        ''')
        players = cur.fetchall()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'players': [dict(p) for p in players]}),
        'isBase64Encoded': False
    }


def get_profile(conn, user_id: str) -> dict:
    '''Получение профиля игрока по ID'''
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute('''
            SELECT 
                u.id,
                u.username,
                u.email,
                u.avatar_emoji,
                u.created_at,
                pp.level,
                pp.rating,
                pp.wins,
                pp.losses,
                pp.total_battles,
                pp.average_damage,
                pp.play_time_hours,
                pp.rank_position
            FROM users u
            JOIN player_profiles pp ON u.id = pp.user_id
            WHERE u.id = %s
        ''', (user_id,))
        
        profile = cur.fetchone()
        
        if not profile:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Profile not found'}),
                'isBase64Encoded': False
            }
        
        cur.execute('''
            SELECT 
                a.name,
                a.description,
                a.icon_emoji,
                a.rarity,
                ua.unlocked_at
            FROM user_achievements ua
            JOIN achievements a ON ua.achievement_id = a.id
            WHERE ua.user_id = %s
            ORDER BY ua.unlocked_at DESC
        ''', (user_id,))
        
        achievements = cur.fetchall()
        
        profile_dict = dict(profile)
        profile_dict['created_at'] = profile_dict['created_at'].isoformat() if profile_dict.get('created_at') else None
        
        achievements_list = []
        for a in achievements:
            achievement_dict = dict(a)
            achievement_dict['unlocked_at'] = achievement_dict['unlocked_at'].isoformat() if achievement_dict.get('unlocked_at') else None
            achievements_list.append(achievement_dict)
        
        profile_dict['achievements'] = achievements_list
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'profile': profile_dict}),
        'isBase64Encoded': False
    }


def register_user(conn, data: dict) -> dict:
    '''Регистрация нового пользователя'''
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    password_hash = f'$2b$12$hashed_{password}'
    
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        try:
            cur.execute('''
                INSERT INTO users (username, email, password_hash, avatar_emoji)
                VALUES (%s, %s, %s, '🎮')
                RETURNING id
            ''', (username, email, password_hash))
            
            user_id = cur.fetchone()['id']
            
            cur.execute('''
                INSERT INTO player_profiles (user_id, level, rating, wins, losses, total_battles, average_damage, play_time_hours, rank_position)
                VALUES (%s, 1, 1000, 0, 0, 0, 0, 0, NULL)
            ''', (user_id,))
            
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'user_id': user_id}),
                'isBase64Encoded': False
            }
        
        except psycopg2.IntegrityError:
            conn.rollback()
            return {
                'statusCode': 409,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Username or email already exists'}),
                'isBase64Encoded': False
            }