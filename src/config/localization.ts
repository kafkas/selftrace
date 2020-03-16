import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  en: {
    buttons: {
      update: 'Update',
      forgotPassword: 'Forgot my password',
      reset: 'Reset',
      signin: 'Sign in',
      signup: 'Sign up',
      signout: 'Sign out',
    },
    alerts: {
      signout: {
        title: 'Sign out?',
        description: 'Are you sure you want to sign out?',
        option1: 'Sign out',
        cancel: 'Cancel',
      },
    },
    headers: {
      signin: 'Sign in',
      signup: 'Sign Up',
      form: 'Form',
      resetPassword: 'Reset password',
      account: 'Account',
      profile: 'Profile',
      updatePassword: 'Update password',
    },
    inputs: {
      email: 'Email',
      password: 'Password',
      newPasswordPlaceholder: 'Your new password',
      confirmPasswordPlaceholder: 'Confirm new password',
    },
    screens: {
      account: {
        profile: 'Profile',
        updatePassword: 'Update password',
      },
      map: {
        userTestedPositive: 'User tested positive',
        userShowingSymptoms: 'User showing symptoms',
        testedPositive: 'Tested positive',
        showingSymptoms: 'Showing symptoms',
      },
    },
    form: {
      topNote:
        'Please keep your well-being status up to date. You can choose one of the following options.',
      wellbeing: 'Well-being',
      important: 'Important',
      note: 'Note',
      options: {
        well: {
          label: 'Feeling Well',
          description:
            "I have not been tested but don't show any of the coronavirus (COVID-19) symptoms. All is well!",
          important: '',
          note: '',
        },
        symptoms: {
          label: 'Showing Symptoms',
          description:
            'I have not been tested and I am feeling unwell. I think I am showing some of the coronavirus (COVID-19) symptoms.',
          important:
            'Please note that if you choose this option, we will display your approximate location and your well-being status on the map in order to encourage other users to self-distance. We will never share information that may reveal your identity.',
          note:
            'It may prove helpful to choose this option even if your symptoms are mild.',
        },
        negative: {
          label: 'Tested Negative',
          description:
            "I have been tested. According to the results, I don't have coronavirus (COVID-19).",
          important: '',
          note: '',
        },
        positive: {
          label: 'Tested Positive',
          description:
            'I have been tested. According to the results, I have coronavirus (COVID-19).',
          important:
            'Please note that if you choose this option, we will display your approximate location on the map in order to encourage other users to self-distance. We will never share your identity.',
          note: '',
        },
      },
    },
  },
  tr: {
    auth: {
      signupTitle: '',
      signin: '',
      signup: '',
      forgotPassword: '',
    },
    form: {
      topNote:
        'Lütfen sağlık durumunuzu güncel tutun. Aşağıdaki seçeneklerden herhangi birini seçebilirsiniz.',
      wellbeing: 'Sağlık Durumu',
      options: {
        well: {
          label: 'Her Şey Yolunda',
          description:
            'Test edilmedim ancak koronavirüs (COVID-19) belirtilerinin hiçbirini göstermiyorum. Her şey yolunda!',
          note: '',
        },
        symptoms: {
          label: 'Belirtiler Gösteriyorum',
          description:
            'Test edilmedim ve kendimi iyi hissetmiyorum. Sanırım bazı koronavirüs (COVID-19) belirtilerini gösteriyorum.',
        },
        negative: {
          label: 'Test Sonucum Negatif',
          description:
            'Test edildim. Sonuçlara göre koronavirüsüm (COVID-19) yok.',
        },
        positive: {
          label: 'Test Sonucum Pozitif',
          description:
            'Test edildim. Sonuçlara göre koronavirüsüm (COVID-19) var.',
        },
      },
    },
  },
  ru: {
    form: {
      topNote:
        'Пожалуйста, держите ваше здоровье в своевременном состоянии. Вы можете выбрать один из следующих вариантов.',
      wellbeing: 'Здоровье',
      options: {
        well: {
          label: 'Все Хорошо',
          description:
            'Я не был проверен, но не показываю никаких признаков коронавируса (КОВИД-19). Все хорошо!',
          note: '',
        },
        symptoms: {
          label: 'Показываю Симптомы',
          description:
            'Я не был проверен, и я чувствую себя плохо. Я думаю, что я показываю некоторые симптомы коронавируса (КОВИД-19).',
          note:
            'Может оказаться полезным выбрать этот вариант, даже если у вас слабые симптомы.',
        },
        negative: {
          label: 'Отрицательный Результат',
          description:
            'Я был проверен. Согласно результатам, у меня нет коронавируса (КОВИД-19).',
        },
        positive: {
          label: 'Положительный Результат',
          description:
            'Я был проверен. По результатам у меня есть коронавирус (КОВИД-19).',
        },
      },
    },
  },
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;
