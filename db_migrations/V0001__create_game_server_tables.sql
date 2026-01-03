-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_emoji VARCHAR(10) DEFAULT '🎮',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы профилей игроков
CREATE TABLE IF NOT EXISTS player_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id),
    level INTEGER DEFAULT 1,
    rating INTEGER DEFAULT 1000,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    total_battles INTEGER DEFAULT 0,
    average_damage INTEGER DEFAULT 0,
    play_time_hours INTEGER DEFAULT 0,
    rank_position INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы достижений
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon_emoji VARCHAR(10) NOT NULL,
    rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('Обычное', 'Редкое', 'Эпическое', 'Легендарное')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание связующей таблицы пользователей и достижений
CREATE TABLE IF NOT EXISTS user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    achievement_id INTEGER REFERENCES achievements(id),
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_player_profiles_user_id ON player_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_player_profiles_rating ON player_profiles(rating DESC);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

-- Вставка базовых достижений
INSERT INTO achievements (name, description, icon_emoji, rarity) VALUES
    ('Легенда', 'Достигнут 99 уровень', '🏆', 'Легендарное'),
    ('Воин', '1000 побед в бою', '⚔️', 'Эпическое'),
    ('Снайпер', '100 точных попаданий подряд', '🎯', 'Редкое'),
    ('Защитник', 'Заблокировано 10,000 урона', '🛡️', 'Эпическое'),
    ('Молния', '10 побед за 10 минут', '⚡', 'Редкое'),
    ('Коллекционер', 'Собраны все предметы', '💎', 'Легендарное'),
    ('Новичок', 'Первая победа', '🌟', 'Обычное'),
    ('Ветеран', '500 боёв проведено', '🎖️', 'Эпическое')
ON CONFLICT (name) DO NOTHING;