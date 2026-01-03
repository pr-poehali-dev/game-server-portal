import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const features = [
    {
      icon: 'Users',
      title: 'Огромное сообщество',
      description: 'Более 10,000 активных игроков онлайн каждый день'
    },
    {
      icon: 'Trophy',
      title: 'Система достижений',
      description: 'Получайте награды за выполнение уникальных задач'
    },
    {
      icon: 'Shield',
      title: 'Честная игра',
      description: 'Продвинутая античит-система и модерация 24/7'
    },
    {
      icon: 'Zap',
      title: 'Без лагов',
      description: 'Мощные серверы с ping < 20ms для России и СНГ'
    }
  ];

  const topPlayers = [
    { id: '1', username: 'DarkKnight', rating: 2850, level: 99, avatar: '🏆' },
    { id: '2', username: 'ShadowHunter', rating: 2740, level: 95, avatar: '⚔️' },
    { id: '3', username: 'MysticMage', rating: 2680, level: 92, avatar: '🔮' },
    { id: '4', username: 'DragonSlayer', rating: 2620, level: 90, avatar: '🐉' },
    { id: '5', username: 'PhoenixRider', rating: 2580, level: 88, avatar: '🔥' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Твоё приключение
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  начинается здесь
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Присоединяйся к лучшему игровому серверу. Создай профиль, покоряй рейтинги и получай достижения
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Начать играть
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/rules">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Узнать больше
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Почему выбирают нас</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border-border bg-card hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <Icon name={feature.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Топ игроков</h2>
              <p className="text-muted-foreground">Лучшие игроки нашего сервера</p>
            </div>

            <div className="max-w-2xl mx-auto">
              {topPlayers.map((player, index) => (
                <Link to={`/profile/${player.id}`} key={player.id}>
                  <Card className="mb-3 border-border bg-card hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-2xl font-bold text-muted-foreground w-8">
                            #{index + 1}
                          </div>
                          <div className="text-4xl">{player.avatar}</div>
                          <div>
                            <h3 className="text-lg font-semibold">{player.username}</h3>
                            <p className="text-sm text-muted-foreground">Уровень {player.level}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-primary">
                            <Icon name="Star" size={20} />
                            <span className="text-2xl font-bold">{player.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">рейтинг</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Готов начать?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Создай аккаунт прямо сейчас и получи стартовый бонус
            </p>
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Зарегистрироваться бесплатно
                <Icon name="Sparkles" size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Gamepad2" size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold">GameServer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 GameServer. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
