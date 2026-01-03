import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Обновление 2.5: Новые достижения',
      description: 'Добавлено 50 новых достижений и уникальных наград. Теперь прогресс игроков отслеживается ещё детальнее!',
      date: '2024-01-15',
      category: 'Обновление',
      icon: 'Trophy'
    },
    {
      id: 2,
      title: 'Турнир "Зимний чемпион"',
      description: 'Приглашаем всех игроков принять участие в грандиозном турнире. Призовой фонд: 100,000 игровых монет!',
      date: '2024-01-10',
      category: 'Событие',
      icon: 'Swords'
    },
    {
      id: 3,
      title: 'Улучшена система античита',
      description: 'Обновлена система защиты от читеров. Все игроки могут играть в честной и безопасной среде.',
      date: '2024-01-05',
      category: 'Безопасность',
      icon: 'Shield'
    },
    {
      id: 4,
      title: 'Новый регион: Азия-Тихоокеанский',
      description: 'Открыты новые серверы в регионе Азии. Ping для игроков из региона снижен до 10-15ms!',
      date: '2024-01-01',
      category: 'Серверы',
      icon: 'Globe'
    },
    {
      id: 5,
      title: 'Рождественское событие завершено',
      description: 'Спасибо всем участникам рождественского события! Более 5000 игроков получили уникальные награды.',
      date: '2023-12-28',
      category: 'Событие',
      icon: 'Gift'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Обновление': 'bg-primary/20 text-primary border-primary/30',
      'Событие': 'bg-secondary/20 text-secondary border-secondary/30',
      'Безопасность': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Серверы': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4">Новости</h1>
              <p className="text-xl text-muted-foreground">
                Последние обновления и события сервера
              </p>
            </div>

            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <Card 
                  key={item.id}
                  className="border-border bg-card hover:border-primary/50 transition-all duration-300 hover:scale-[1.01] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                          <Icon name={item.icon} size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-2xl">{item.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Icon name="Calendar" size={16} />
                              <span>{new Date(item.date).toLocaleDateString('ru-RU', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                          </div>
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default News;
