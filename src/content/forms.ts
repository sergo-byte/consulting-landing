import type { L, LList } from "@/lib/i18n";

/* ============================================================
   ФОРМА

   Демонстрационная: проверяет заполнение и показывает результат,
   но никуда ничего не отправляет.
   ============================================================ */

export const formStrings = {
  name: { ru: "Имя и фамилия", en: "Full name" } satisfies L,
  email: { ru: "E-mail", en: "Email" } satisfies L,
  company: { ru: "Компания и должность", en: "Company and role" } satisfies L,
  contact: { ru: "Telegram или телефон", en: "Telegram or phone" } satisfies L,
  link: { ru: "Ссылка на резюме", en: "Link to your CV" } satisfies L,
  message: { ru: "Сообщение", en: "Message" } satisfies L,
  messageHintContact: {
    ru: "Коротко о задаче и о том, какой результат нужен.",
    en: "Briefly: the task and the result you need.",
  } satisfies L,
  messageHintCareers: {
    ru: "Коротко о себе и о том, какие задачи вам интересны.",
    en: "Briefly: about you and the work that interests you.",
  } satisfies L,
  optional: { ru: "необязательно", en: "optional" } satisfies L,
  submit: { ru: "Отправить", en: "Send" } satisfies L,
  sending: { ru: "Отправляем…", en: "Sending…" } satisfies L,
  sent: {
    ru: "Форма заполнена верно. Это демонстрация: заявка никуда не отправлена.",
    en: "The form is valid. This is a demo: nothing was actually sent.",
  } satisfies L,
  errorValidation: {
    ru: "Заполните имя, корректный e-mail и сообщение.",
    en: "Please fill in a name, a valid email and a message.",
  } satisfies L,
  errorDelivery: {
    ru: "Не удалось отправить.",
    en: "Delivery failed.",
  } satisfies L,
  privacy: {
    ru: "Отправляя форму, вы соглашаетесь на обработку указанных данных для ответа на обращение.",
    en: "By submitting the form you agree to your data being processed so that we can reply.",
  } satisfies L,
};

export const contactPage = {
  eyebrow: { ru: "Контакты", en: "Contact" } satisfies L,
  title: {
    ru: "Опишите задачу",
    en: "Describe the task",
  } satisfies L,
  lede: {
    ru: "Расскажите, на каком решении вы застряли. Ответим, чем это лечится, сколько занимает и что потребуется с вашей стороны.",
    en: "Tell us which decision you are stuck on. We will say what it takes to unstick it, how long it takes and what we need from you.",
  } satisfies L,
  directTitle: { ru: "Как мы отвечаем", en: "How we reply" } satisfies L,
  directItems: {
    ru: [
      "Читает человек из практики, а не менеджер по продажам",
      "В ответе — что мы поняли из задачи и чего не хватает, чтобы оценить",
      "Если задача не наша, скажем об этом прямо",
    ],
    en: [
      "A practitioner reads it, not a salesperson",
      "The reply says what we understood and what is missing to scope it",
      "If the task is not ours, we will say so plainly",
    ],
  } satisfies LList,
  formTitle: { ru: "Форма", en: "Form" } satisfies L,
};
