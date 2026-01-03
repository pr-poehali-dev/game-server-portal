import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Profile = () => {
  const { id } = useParams();

  const profiles: Record<string, any> = {
    '1': {
      username: 'DarkKnight',
      avatar: '🏆',
      level: 99,
      rating: 2850,
      wins: 1247,
      losses: 342,
      rank: '#1',
      joinDate: '2023-01-15',
      stats: [
        { label: 'Боёв проведено', value: 1589 },
        { label: 'Винрейт', value: '78.5%' },
        { label: 'Средний урон', value: '4,250' },
        { label: 'Время в игре', value: '1,247ч' }
      ],
      achievements: [
        { icon: '🏆', title: 'Легенда', description: 'Достигнут 99 уровень', rarity: 'Легендарное' },
        { icon: '⚔️', title: 'Воин', description: '1000 побед в бою', rarity: 'Эпическое' },
        { icon: '🎯', title: 'Снайпер', description: '100 точных попаданий подряд', rarity: 'Редкое' },
        { icon: '🛡️', title: 'Защитник', description: 'Заблокировано 10,000 урона', rarity: 'Эпическое' },
        { icon: '⚡', title: 'Молния', description: '10 побед за 10 минут', rarity: 'Редкое' },
        { icon: '💎', title: 'Коллекционер', description: 'Собраны все предметы', rarity: 'Легендарное' }
      ]
    },
    '2': {
      username: 'ShadowHunter',
      avatar: '⚔️',
      level: 95,
      rating: 2740,
      wins: 1089,
      losses: 398,
      rank: '#2',
      joinDate: '2023-02-20',
      stats: [
        { label: 'Боёв проведено', value: 1487 },
        { label: 'Винрейт', value: '73.2%' },
        { label: 'Средний урон', value: '3,980' },
        { label: 'Время в игре', value: '1,089ч' }
      ],
      achievements: [
        { icon: '⚔️', title: 'Воин', description: '1000 побед в бою', rarity: 'Эпическое' },
        { icon: '🎯', title: 'Снайпер', description: '100 точных попаданий подряд', rarity: 'Редкое' },
        { icon: '🛡️', title: 'Защитник', description: 'Заблокировано 10,000 урона', rarity: 'Эпическое' },
        { icon: '⚡', title: 'Молния', description: '10 побед за 10 минут', rarity: 'Редкое' }
      ]
    }
  };

  const profile = profiles[id || '1'] || profiles['1'];
  const winrate = (profile.wins / (profile.wins + profile.losses)) * 100;
  const nextLevelProgress = ((profile.level % 10) / 10) * 100;

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
                    <div className="text-8xl">{profile.avatar}</div>
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-4 py-1">
                      {profile.rank}
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-4xl font-bold mb-2">{profile.username}</h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Icon name="Calendar" size={16} />
                          Играет с {new Date(profile.joinDate).toLocaleDateString('ru-RU', { 
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
              {profile.stats.map((stat: any, index: number) => (
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
                <div className="grid md:grid-cols-2 gap-4">
                  {profile.achievements.map((achievement: any, index: number) => (
                    <Card 
                      key={index}
                      className="border-border bg-background hover:border-primary/50 transition-all duration-300"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold">{achievement.title}</h3>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
