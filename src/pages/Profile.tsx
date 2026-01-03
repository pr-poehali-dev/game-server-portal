import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/176fdebd-24d7-4b16-b82d-9edbf386d028';

interface Achievement {
  name: string;
  description: string;
  icon_emoji: string;
  rarity: string;
}

interface ProfileData {
  id: number;
  username: string;
  email: string;
  avatar_emoji: string;
  created_at: string;
  level: number;
  rating: number;
  wins: number;
  losses: number;
  total_battles: number;
  average_damage: number;
  play_time_hours: number;
  rank_position: number | null;
  achievements: Achievement[];
}

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    fetch(`${API_URL}?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setProfile(data.profile);
        } else {
          setError('Профиль не найден');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch profile:', err);
        setError('Ошибка загрузки профиля');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-muted-foreground">Загрузка...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-muted-foreground">{error || 'Профиль не найден'}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const winrate = profile.wins + profile.losses > 0 
    ? (profile.wins / (profile.wins + profile.losses)) * 100 
    : 0;
  const nextLevelProgress = ((profile.level % 10) / 10) * 100;
  
  const stats = [
    { label: 'Боёв проведено', value: profile.total_battles },
    { label: 'Винрейт', value: `${winrate.toFixed(1)}%` },
    { label: 'Средний урон', value: profile.average_damage.toLocaleString() },
    { label: 'Время в игре', value: `${profile.play_time_hours}ч` }
  ];

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      'Легендарное': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Эпическое': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Редкое': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
    return colors[rarity] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Card className="border-border bg-card mb-8 animate-fade-in">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="text-8xl">{profile.avatar_emoji}</div>
                    {profile.rank_position && (
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-4 py-1">
                        #{profile.rank_position}
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-4xl font-bold mb-2">{profile.username}</h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Icon name="Calendar" size={16} />
                          Играет с {new Date(profile.created_at).toLocaleDateString('ru-RU', { 
                            year: 'numeric', 
                            month: 'long' 
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Уровень {profile.level}</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(nextLevelProgress)}% до следующего
                          </span>
                        </div>
                        <Progress value={nextLevelProgress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Рейтинг</p>
                          <p className="text-2xl font-bold text-primary">{profile.rating}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Винрейт</p>
                          <p className="text-2xl font-bold text-secondary">{winrate.toFixed(1)}%</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Побед</p>
                          <p className="text-2xl font-bold">{profile.wins}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Поражений</p>
                          <p className="text-2xl font-bold">{profile.losses}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {stats.map((stat: any, index: number) => (
                <Card 
                  key={index}
                  className="border-border bg-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border bg-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="Award" size={20} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">
                    Достижения ({profile.achievements.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {profile.achievements.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Пока нет достижений</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile.achievements.map((achievement: Achievement, index: number) => (
                      <Card 
                        key={index}
                        className="border-border bg-background hover:border-primary/50 transition-all duration-300"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="text-3xl">{achievement.icon_emoji}</div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="font-semibold">{achievement.name}</h3>
                                <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                                  {achievement.rarity}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;