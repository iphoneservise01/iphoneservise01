import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

type FormData = {
  name: string;
  phone: string;
  email: string;
  model: string;
  issue: string;
  formType: 'repair' | 'purchase';
};

type PhoneRepairFormProps = {
  formType: 'repair' | 'purchase';
  title: string;
};

export function PhoneRepairForm({ formType, title }: PhoneRepairFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Формирование данных для отправки
      const formData = {
        ...data,
        formType,
        submittedAt: new Date().toISOString(),
      };

      // TODO: Здесь должна быть интеграция с вашим email-сервисом
      // Например, можно использовать EmailJS, SendGrid API, или backend endpoint
      console.log('Form data to send:', formData);
      
      // Имитация отправки (замените на реальную отправку)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Заявка отправлена!', {
        description: 'Мы свяжемся с вами в ближайшее время.',
      });
      
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Ошибка отправки', {
        description: 'Попробуйте еще раз или свяжитесь с нами напрямую.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor={`name-${formType}`}>Имя *</Label>
          <Input
            id={`name-${formType}`}
            {...register('name', { required: 'Имя обязательно' })}
            placeholder="Иван Иванов"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`phone-${formType}`}>Телефон *</Label>
          <Input
            id={`phone-${formType}`}
            {...register('phone', { 
              required: 'Телефон обязателен',
              pattern: {
                value: /^[\d\s+()-]+$/,
                message: 'Неверный формат телефона'
              }
            })}
            placeholder="+7 (999) 123-45-67"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`email-${formType}`}>Email *</Label>
        <Input
          id={`email-${formType}`}
          type="email"
          {...register('email', { 
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат email'
            }
          })}
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`model-${formType}`}>Модель iPhone *</Label>
        <select
          id={`model-${formType}`}
          {...register('model', { required: 'Выберите модель' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Выберите модель</option>
          <option value="iPhone 17 Air">iPhone 17 Air</option>
          <option value="iPhone 17 ">iPhone 17</option>
          <option value="iPhone 17 Pro">iPhone 17 Pro</option>
          <option value="iPhone 17 Pro Max">iPhone 17 Pro Max</option>
        </select>
        {errors.model && (
          <p className="text-sm text-red-500">{errors.model.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`issue-${formType}`}>
          {formType === 'repair' ? 'Описание проблемы *' : 'Комментарий'}
        </Label>
        <Textarea
          id={`issue-${formType}`}
          {...register('issue', { 
            required: formType === 'repair' ? 'Опишите проблему' : false 
          })}
          placeholder={
            formType === 'repair' 
              ? 'Опишите неисправность вашего устройства...' 
              : 'Дополнительная информация или вопросы...'
          }
          rows={4}
        />
        {errors.issue && (
          <p className="text-sm text-red-500">{errors.issue.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isSubmitting ? (
          'Отправка...'
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Отправить заявку
          </>
        )}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        * Обязательные поля
      </p>
    </form>
  );
}
