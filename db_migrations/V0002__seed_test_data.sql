-- Вставка тестовых пользователей
INSERT INTO users (username, email, password_hash, avatar_emoji) VALUES
    ('DarkKnight', 'darkknight@game.com', '$2b$12$hashedpassword1', '🏆'),
    ('ShadowHunter', 'shadow@game.com', '$2b$12$hashedpassword2', '⚔️'),
    ('MysticMage', 'mystic@game.com', '$2b$12$hashedpassword3', '🔮'),
    ('DragonSlayer', 'dragon@game.com', '$2b$12$hashedpassword4', '🐉'),
    ('PhoenixRider', 'phoenix@game.com', '$2b$12$hashedpassword5', '🔥')
ON CONFLICT (username) DO NOTHING;

-- Вставка профилей игроков
INSERT INTO player_profiles (user_id, level, rating, wins, losses, total_battles, average_damage, play_time_hours, rank_position) VALUES
    (1, 99, 2850, 1247, 342, 1589, 4250, 1247, 1),
    (2, 95, 2740, 1089, 398, 1487, 3980, 1089, 2),
    (3, 92, 2680, 980, 420, 1400, 3750, 980, 3),
    (4, 90, 2620, 920, 450, 1370, 3650, 920, 4),
    (5, 88, 2580, 880, 470, 1350, 3550, 880, 5)
ON CONFLICT (user_id) DO NOTHING;

-- Добавление достижений для топовых игроков
INSERT INTO user_achievements (user_id, achievement_id) VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
    (2, 2), (2, 3), (2, 4), (2, 5),
    (3, 2), (3, 3), (3, 7),
    (4, 2), (4, 7), (4, 8),
    (5, 3), (5, 7), (5, 8)
ON CONFLICT (user_id, achievement_id) DO NOTHING;