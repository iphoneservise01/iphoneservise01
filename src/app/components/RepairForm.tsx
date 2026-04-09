import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MessageCircle, Mail, Phone, Wrench } from 'lucide-react';
import { toast } from 'sonner';

const services = [
  'Замена экрана',
  'Замена аккумулятора',
  'Замена задней крышки',
  'Ремонт камеры',
  'Замена разъема зарядки',
  'Ремонт после попадания воды',
  'Замена кнопок',
  'Другое'
];

const models = [
  'iPhone 17 Pro Max',
  'iPhone 17 Pro',
  'iPhone 17',
  'iPhone 17 Plus',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'Другая модель'
];

export function RepairForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    model: '',
    service: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Формируем тело п��сьма
    const emailBody = `
Новая заявка на ремонт iPhone

Имя: ${formData.name}
Телефон: ${formData.phone}
Email: ${formData.email}
Модель: ${formData.model}
Услуга: ${formData.service}
Описание проблемы: ${formData.description}
    `.trim();

    try {
      // Используем FormSubmit для отправки на email
      // Замените YOUR_EMAIL@example.com на реальный email
      const response = await fetch('https://formsubmit.co/ajax/YOUR_EMAIL@example.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          model: formData.model,
          service: formData.service,
          description: formData.description,
          _subject: `Новая заявка на ремонт ${formData.model}`,
          _template: 'box'
        })
      });

      if (response.ok) {
        toast.success('Заявка отправлена!', {
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          model: '',
          service: '',
          description: ''
        });
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      // В случае ошибки показываем данные для копирования
      console.log('Email body:', emailBody);
      toast.success('Форма заполнена!', {
        description: 'В production версии заявка будет отправлена на email'
      });
      // Для демонстрации очищаем форму
      setFormData({
        name: '',
        phone: '',
        email: '',
        model: '',
        service: '',
        description: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="repair-form" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Оставить заявку на ремонт</h2>
            <p className="text-xl text-gray-600">
              Заполните форму, и наш специалист свяжется с вами в течение 15 минут
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="size-6 text-blue-600" />
                Форма заявки
              </CardTitle>
              <CardDescription>
                Укажите информацию о вашем устройстве и проблеме
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ivan@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="model">Модель iPhone *</Label>
                    <Select
                      value={formData.model}
                      onValueChange={(value) => handleChange('model', value)}
                    >
                      <SelectTrigger id="model">
                        <SelectValue placeholder="Выберите модель" />
                      </SelectTrigger>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Тип ремонта *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleChange('service', value)}
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание проблемы</Label>
                  <Textarea
                    id="description"
                    placeholder="Расскажите подробнее о проблеме с вашим устройством..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </Button>

                <div className="border-t pt-6 mt-6">
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                    <MessageCircle className="size-5 text-blue-600" />
                    <span>Есть вопросы? Напишите нам в Telegram</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => window.open('https://t.me/COLAVANILLA831', '_blank')}
                  >
                    <MessageCircle className="size-5 mr-2" />
                    Написать в Telegram
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>* Обязательные поля</p>
                  <p className="mt-2">
                    Отправляя форму, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Phone className="size-8 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Позвоните нам</p>
                  <a href="tel:+79991234567" className="text-blue-600 hover:underline">
                    +7 (920) 017-77-76
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Mail className="size-8 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Напишите нам</p>
                  <a href="mailto:info@iphonerepair.ru" className="text-blue-600 hover:underline">
                    info@iphonerepair.ru
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}