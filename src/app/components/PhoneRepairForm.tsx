import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

type FormType = 'repair' | 'purchase';

type PhoneRepairFormProps = {
  formType: FormType;
  title: string;
};

type FormValues = {
  name: string;
  phone: string;
  email: string;
  model: string;
  issue: string;
  website: string;
};

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  model?: string;
  issue?: string;
};

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  model: '',
  issue: '',
  website: '',
};

const DUPLICATE_BLOCK_TIME = 60 * 1000;

const MAX_NAME_LENGTH = 60;
const MAX_PHONE_LENGTH = 25;
const MAX_EMAIL_LENGTH = 100;
const MAX_ISSUE_LENGTH = 1000;
const MAX_WEBSITE_LENGTH = 200;

const repairModels = ['iPhone', 'Samsung', 'Xiaomi', 'Honor'];

const purchaseModels = [
  'iPhone 17 Air',
  'iPhone 17',
  'iPhone 17 Pro',
  'iPhone 17 Pro Max',
];

export function PhoneRepairForm({ formType }: PhoneRepairFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formOpenedAt] = useState(Date.now());
  const [lastSubmission, setLastSubmission] = useState<{
    fingerprint: string;
    timestamp: number;
  } | null>(null);

  const availableModels = formType === 'repair' ? repairModels : purchaseModels;

  const API_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3001/api/submit'
      : 'https://iphone-servis-backend.onrender.com/api/submit';

  const handleChange = (field: keyof FormValues, value: string) => {
    let nextValue = value;

    if (field === 'name') nextValue = value.slice(0, MAX_NAME_LENGTH);
    if (field === 'phone') nextValue = value.slice(0, MAX_PHONE_LENGTH);
    if (field === 'email') nextValue = value.slice(0, MAX_EMAIL_LENGTH);
    if (field === 'issue') nextValue = value.slice(0, MAX_ISSUE_LENGTH);
    if (field === 'website') nextValue = value.slice(0, MAX_WEBSITE_LENGTH);

    setValues((prev) => ({
      ...prev,
      [field]: nextValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!values.name.trim()) {
      newErrors.name = 'Имя обязательно';
    } else if (values.name.trim().length > MAX_NAME_LENGTH) {
      newErrors.name = `Имя слишком длинное (до ${MAX_NAME_LENGTH} символов)`;
    }

    if (!values.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    } else if (!/^[\d\s+()-]+$/.test(values.phone.trim())) {
      newErrors.phone = 'Неверный формат телефона';
    } else if (values.phone.trim().length > MAX_PHONE_LENGTH) {
      newErrors.phone = `Телефон слишком длинный (до ${MAX_PHONE_LENGTH} символов)`;
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())
    ) {
      newErrors.email = 'Неверный формат email';
    } else if (values.email.trim().length > MAX_EMAIL_LENGTH) {
      newErrors.email = `Email слишком длинный (до ${MAX_EMAIL_LENGTH} символов)`;
    }

    if (!values.model.trim()) {
      newErrors.model = 'Выберите модель';
    }

    if (formType === 'repair' && !values.issue.trim()) {
      newErrors.issue = 'Опишите проблему';
    } else if (values.issue.trim().length > MAX_ISSUE_LENGTH) {
      newErrors.issue = `Комментарий слишком длинный (до ${MAX_ISSUE_LENGTH} символов)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (values.website.trim()) {
      return;
    }

    if (Date.now() - formOpenedAt < 3000) {
      toast.error('Подождите пару секунд и попробуйте снова.');
      return;
    }

    const isValid = validate();
    if (!isValid) return;

    const fingerprint = JSON.stringify({
      formType,
      name: values.name.trim().toLowerCase(),
      phone: values.phone.trim(),
      email: values.email.trim().toLowerCase(),
      model: values.model.trim(),
      issue: values.issue.trim(),
    });

    if (
      lastSubmission &&
      lastSubmission.fingerprint === fingerprint &&
      Date.now() - lastSubmission.timestamp < DUPLICATE_BLOCK_TIME
    ) {
      toast.error('Такая заявка уже была отправлена недавно.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          formType,
          name: values.name,
          phone: values.phone,
          email: values.email,
          model: values.model,
          issue: values.issue || '',
          website: values.website,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Ошибка отправки');
      }

      toast.success('Заявка отправлена!', {
        description: 'Мы свяжемся с вами в ближайшее время.',
      });

      setLastSubmission({
        fingerprint,
        timestamp: Date.now(),
      });

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error('Ошибка отправки', {
        description: 'Попробуйте еще раз или свяжитесь с нами напрямую.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 md:space-y-6">
      <div className="hidden">
        <Label htmlFor={`website-${formType}`}>Website</Label>
        <Input
          id={`website-${formType}`}
          value={values.website}
          onChange={(e) => handleChange('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          maxLength={MAX_WEBSITE_LENGTH}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <div className="space-y-2">
          <Label htmlFor={`name-${formType}`}>Имя *</Label>
          <Input
            id={`name-${formType}`}
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Иван Иванов"
            autoComplete="name"
            maxLength={MAX_NAME_LENGTH}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`phone-${formType}`}>Телефон *</Label>
          <Input
            id={`phone-${formType}`}
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+7 (999) 123-45-67"
            autoComplete="tel"
            maxLength={MAX_PHONE_LENGTH}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`email-${formType}`}>Email *</Label>
        <Input
          id={`email-${formType}`}
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="example@email.com"
          autoComplete="email"
          maxLength={MAX_EMAIL_LENGTH}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`model-${formType}`}>Модель техники *</Label>
        <select
          id={`model-${formType}`}
          value={values.model}
          onChange={(e) => handleChange('model', e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            {formType === 'repair' ? 'Выберите бренд или модель' : 'Выберите iPhone'}
          </option>
          {availableModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        {errors.model && <p className="text-sm text-red-500">{errors.model}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`issue-${formType}`}>
          {formType === 'repair' ? 'Описание проблемы *' : 'Комментарий'}
        </Label>
        <Textarea
          id={`issue-${formType}`}
          value={values.issue}
          onChange={(e) => handleChange('issue', e.target.value)}
          placeholder={
            formType === 'repair'
              ? 'Опишите неисправность вашего устройства...'
              : 'Дополнительная информация или вопросы...'
          }
          rows={4}
          maxLength={MAX_ISSUE_LENGTH}
        />
        {errors.issue && <p className="text-sm text-red-500">{errors.issue}</p>}
        <p className="text-right text-xs text-gray-400">
          {values.issue.length}/{MAX_ISSUE_LENGTH}
        </p>
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

      <p className="text-center text-sm text-gray-500">
        * Обязательные поля
      </p>
    </form>
  );
}