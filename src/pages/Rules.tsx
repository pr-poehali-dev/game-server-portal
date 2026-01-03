import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Rules = () => {
  const rules = [
    {
      category: 'Общие правила',
      icon: 'BookOpen',
      items: [
        {
          title: 'Уважение к другим игрокам',
          content: 'Запрещены оскорбления, угрозы, дискриминация по любым признакам. Относитесь к другим игрокам так, как хотели бы, чтобы относились к вам.'
        },
        {
          title: 'Запрет на мультиаккаунты',
          content: 'Каждый игрок может иметь только один аккаунт. Создание дополнительных аккаунтов для обхода блокировки или получения преимуществ запрещено.'
        },
        {
          title: 'Русский или английский язык',
          content: 'В общем чате разрешено использование только русского или английского языка для удобства модерации и общения.'
        }
      ]
    },
    {
      category: 'Игровой процесс',
      icon: 'Gamepad2',
      items: [
        {
          title: 'Запрет на читы и эксплойты',
          content: 'Использование любых сторонних программ, модификаций игры или эксплуатация багов для получения преимуществ строго запрещено и карается перманентной блокировкой.'
        },
        {
          title: 'Честная игра',
          content: 'Запрещено использование макросов, автокликеров и любых других средств автоматизации действий в игре.'
        },
        {
          title: 'Торговля и обмен',
          content: 'Все сделки между игроками должны быть честными. Мошенничество при обмене предметами карается строгими санкциями.'
        }
      ]
    },
    {
      category: 'Санкции',
      icon: 'Shield',
      items: [
        {
          title: 'Система предупреждений',
          content: 'За нарушение правил выдаётся предупреждение. После трёх предупреждений следует временная блокировка на 7 дней.'
        },
        {
          title: 'Временная блокировка',
          content: 'Может быть выдана на срок от 1 до 30 дней в зависимости от тяжести нарушения. Повторные нарушения увеличивают срок блокировки.'
        },
        {
          title: 'Перманентная блокировка',
          content: 'Выдаётся за серьёзные нарушения: использование читов, мошенничество, создание мультиаккаунтов после блокировки.'
        }
      ]
    },
    {
      category: 'Техническая поддержка',
      icon: 'HelpCircle',
      items: [
        {
          title: 'Обращение в поддержку',
          content: 'При возникновении технических проблем или вопросов обращайтесь в службу поддержки через официальные каналы. Время ответа: до 24 часов.'
        },
        {
          title: 'Апелляция блокировки',
          content: 'Если вы считаете, что были заблокированы несправедливо, можете подать апелляцию. Рассмотрение занимает 3-7 дней.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4">Правила сервера</h1>
              <p className="text-xl text-muted-foreground">
                Ознакомьтесь с правилами перед началом игры
              </p>
            </div>

            <Card className="mb-8 border-primary/30 bg-card/50 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name="AlertCircle" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Важно!</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Незнание правил не освобождает от ответственности. Регистрируясь на сервере, 
                      вы автоматически соглашаетесь с данными правилами. Администрация оставляет за собой 
                      право изменять правила без предварительного уведомления.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {rules.map((section, sectionIndex) => (
                <Card 
                  key={sectionIndex}
                  className="border-border bg-card animate-fade-in"
                  style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Icon name={section.icon} size={20} className="text-white" />
                      </div>
                      <CardTitle className="text-2xl">{section.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {section.items.map((item, itemIndex) => (
                        <AccordionItem key={itemIndex} value={`item-${sectionIndex}-${itemIndex}`}>
                          <AccordionTrigger className="text-left hover:text-primary">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {item.content}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 border-border bg-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Есть вопросы?</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Если у вас остались вопросы по правилам или вы хотите сообщить о нарушении, 
                      свяжитесь с администрацией через официальные каналы поддержки.
                    </p>
                    <div className="flex gap-3">
                      <a href="#" className="text-primary hover:underline flex items-center gap-1">
                        <Icon name="Mail" size={16} />
                        support@gameserver.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rules;
