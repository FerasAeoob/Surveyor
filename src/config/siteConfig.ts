// GeoPrecision Surveying & Architecture - Site Configuration
// Professional trilingual configuration (English / Hebrew / Arabic)

export type Language = 'en' | 'he' | 'ar';

export interface Translation {
  nav: {
    about: string;
    services: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      years: string;
      projects: string;
      accuracy: string;
    };
  };
  about: {
    sectionTitle: string;
    headline: string;
    paragraphs: string[];
    stats: {
      label: string;
      value: string;
    }[];
  };
  services: {
    sectionTitle: string;
    headline: string;
    items: {
      id: string;
      title: string;
      description: string;
      features: string[];
    }[];
  };
  portfolio: {
    sectionTitle: string;
    headline: string;
    filters: {
      all: string;
      urban: string;
      topo: string;
      modeling: string;
      industrial: string;
    };
    projects: {
      id: string;
      title: string;
      category: string;
      location: string;
      year: string;
      specs: string;
    }[];
  };
  contact: {
    sectionTitle: string;
    headline: string;
    form: {
      name: string;
      company: string;
      scope: string;
      scopeOptions: {
        survey: string;
        planning: string;
        modeling: string;
        consultation: string;
        other: string;
      };
      phone: string;
      email: string;
      message: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
  footer: {
    rights: string;
    tagline: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    hero: {
      title: 'Precision Meets Innovation',
      subtitle: 'Tel Aviv\'s premier surveying and architectural firm, delivering millimeter-accurate geospatial data and visionary design solutions for complex urban developments.',
      ctaPrimary: 'Start Your Project',
      ctaSecondary: 'View Our Work',
      stats: {
        years: '25+ Years Experience',
        projects: '500+ Projects',
        accuracy: '99.9% Accuracy',
      },
    },
    about: {
      sectionTitle: 'About Us',
      headline: 'Engineering the Future of Tel Aviv\'s Skyline',
      paragraphs: [
        'Founded in 1999, GeoPrecision has established itself as Israel\'s leading surveying and architectural firm, combining cutting-edge technology with decades of expertise. Our team of certified surveyors, architects, and geospatial engineers serve the most demanding clients in municipal planning, commercial development, and government infrastructure.',
        'We operate at the intersection of precision and innovation. Our fleet of advanced drone systems, 3D laser scanners, and GNSS receivers capture data with sub-centimeter accuracy. This technological advantage, combined with our deep understanding of Israeli regulatory frameworks, ensures every project meets the highest standards of excellence.',
        'From the initial topographical survey to the final architectural blueprint, we provide end-to-end solutions that transform visions into reality. Our work has shaped some of Tel Aviv\'s most iconic developments, earning the trust of developers, planners, and government agencies alike.',
      ],
      stats: [
        { label: 'Completed Projects', value: '500+' },
        { label: 'Team Members', value: '45' },
        { label: 'Surveying Equipment', value: '₪12M' },
        { label: 'Client Satisfaction', value: '98%' },
      ],
    },
    services: {
      sectionTitle: 'Our Services',
      headline: 'Comprehensive Solutions for Complex Challenges',
      items: [
        {
          id: 'topographical',
          title: 'Topographical Surveys',
          description: 'High-precision terrain mapping using LiDAR and photogrammetry for accurate elevation data and contour analysis.',
          features: ['Digital Elevation Models', 'Contour Mapping', 'Volume Calculations', 'Drainage Analysis'],
        },
        {
          id: 'boundary',
          title: 'Boundary & Legal Surveys',
          description: 'Certified property boundary delineation compliant with Israeli Land Registry requirements and legal standards.',
          features: ['Property Line Verification', 'Cadastral Mapping', 'Legal Documentation', 'Dispute Resolution'],
        },
        {
          id: 'laser',
          title: '3D Laser Scanning',
          description: 'Millimeter-accurate point cloud capture for as-built documentation, heritage preservation, and complex structures.',
          features: ['Point Cloud Processing', 'BIM Integration', 'Heritage Documentation', 'Deformation Monitoring'],
        },
        {
          id: 'drone',
          title: 'Aerial Surveying',
          description: 'Drone-based mapping and inspection services for large-scale projects and hard-to-access areas.',
          features: ['Orthophoto Generation', 'Thermal Imaging', 'Progress Monitoring', 'Stockpile Measurement'],
        },
        {
          id: 'urban',
          title: 'Urban Planning',
          description: 'Comprehensive planning services from feasibility studies to detailed urban design and regulatory compliance.',
          features: ['Master Planning', 'Zoning Analysis', 'Environmental Impact', 'Traffic Studies'],
        },
        {
          id: 'bim',
          title: 'BIM & Digital Twins',
          description: 'Building Information Modeling and digital twin creation for intelligent asset management and facility operations.',
          features: ['4D Construction Simulation', 'Clash Detection', 'Asset Management', 'Facility Integration'],
        },
      ],
    },
    portfolio: {
      sectionTitle: 'Portfolio',
      headline: 'Projects That Define Excellence',
      filters: {
        all: 'All Projects',
        urban: 'Urban Planning',
        topo: 'Topographical',
        modeling: '3D Modeling',
        industrial: 'Industrial',
      },
      projects: [
        {
          id: '1',
          title: 'Azrieli Tower Complex Expansion',
          category: 'urban',
          location: 'Tel Aviv',
          year: '2023',
          specs: '45,000 m² | 3 Towers | BIM Level 2',
        },
        {
          id: '2',
          title: 'Ben Gurion Airport Terminal 4',
          category: 'industrial',
          location: 'Lod',
          year: '2022',
          specs: '180,000 m² | Laser Scan | 2.3M Points',
        },
        {
          id: '3',
          title: 'Jaffa Port Redevelopment',
          category: 'urban',
          location: 'Jaffa',
          year: '2023',
          specs: '12 ha | Heritage Survey | 4K Drone',
        },
        {
          id: '4',
          title: 'Intel Fab 28 Expansion',
          category: 'industrial',
          location: 'Kiryat Gat',
          year: '2024',
          specs: '25,000 m² | Precision ±2mm | 24/7 Ops',
        },
        {
          id: '5',
          title: 'Tel Aviv Light Rail Phase 2',
          category: 'topo',
          location: 'Tel Aviv Metro',
          year: '2023',
          specs: '24 km | 1,200 Cross Sections | GNSS RTK',
        },
        {
          id: '6',
          title: 'Rothschild Boulevard Towers',
          category: 'modeling',
          location: 'Tel Aviv',
          year: '2022',
          specs: '65 Floors | 3D Model | Point Cloud',
        },
        {
          id: '7',
          title: 'Haifa Bay Industrial Zone',
          category: 'topo',
          location: 'Haifa',
          year: '2021',
          specs: '850 ha | Topographic | 1:500 Scale',
        },
        {
          id: '8',
          title: 'Jerusalem Heritage Documentation',
          category: 'modeling',
          location: 'Jerusalem Old City',
          year: '2024',
          specs: '15 Sites | Laser Scan | UNESCO Standard',
        },
      ],
    },
    contact: {
      sectionTitle: 'Contact',
      headline: 'Begin Your Project',
      form: {
        name: 'Full Name',
        company: 'Company / Organization',
        scope: 'Project Scope',
        scopeOptions: {
          survey: 'Land Surveying',
          planning: 'Urban Planning',
          modeling: '3D Modeling / BIM',
          consultation: 'Technical Consultation',
          other: 'Other',
        },
        phone: 'Phone Number',
        email: 'Email Address',
        message: 'Project Details',
        submit: 'Submit Inquiry',
        submitting: 'Sending...',
        success: 'Thank you! We will contact you within 24 hours.',
        error: 'Please check your information and try again.',
      },
      info: {
        address: '123 HaMasger Street, Tel Aviv-Yafo, 6721108',
        phone: '+972 3-529-8888',
        email: 'projects@geoprecision.co.il',
        hours: 'Sun-Thu: 08:00-18:00 | Fri: 08:00-12:00',
      },
    },
    footer: {
      rights: '© 2024 GeoPrecision Surveying & Architecture. All rights reserved.',
      tagline: 'Precision. Innovation. Excellence.',
    },
  },
  he: {
    nav: {
      about: 'אודות',
      services: 'שירותים',
      portfolio: 'פרויקטים',
      contact: 'צור קשר',
    },
    hero: {
      title: 'דיוק פוגש חדשנות',
      subtitle: 'חברת המדידות והאדריכלות המובילה בתל אביב, מספקת נתוני מרחב מדויקים לרמת המילימטר ופתרונות עיצוב חזוניים לפיתוחים עירוניים מורכבים.',
      ctaPrimary: 'התחל פרויקט',
      ctaSecondary: 'צפה בעבודותינו',
      stats: {
        years: '25+ שנות ניסיון',
        projects: '500+ פרויקטים',
        accuracy: '99.9% דיוק',
      },
    },
    about: {
      sectionTitle: 'אודות',
      headline: 'מהנדסים את עתיד קו הרקיע של תל אביב',
      paragraphs: [
        'גיאופרסיזיין הוקמה בשנת 1999 והקימה את עצמה כחברת המדידות והאדריכלות המובילה בישראל, המשלבת טכנולוגיה מתקדמת עם עשרות שנות מומחיות. צוות המודדים, האדריכלים ומהנדסי המרחב המוסמכים שלנו משרתים את הלקוחות התובעניים ביותר בתכנון עירוני, פיתוח מסחרי ותשתיות ממשלתיות.',
        'אנו פועלים במפגש שבין דיוק לחדשנות. צי המל"טים המתקדמים, סורקי הלייזר התלת-ממדיים ומקלטי ה-GNSS שלנו לוכדים נתונים בדיוק של מתחת לסנטימטר. יתרון טכנולוגי זה, בשילוב עם ההבנה העמוקה שלנו של המסגרות הרגולטוריות בישראל, מבטיח שכל פרויקט יעמוד בסטנדרטים הגבוהים ביותר של מצוינות.',
        'מהסקר הטופוגרפי הראשוני ועד לתכנית האדריכלית הסופית, אנו מספקים פתרונות מקצה לקצה שהופכים חזונות למציאות. עבודתנו עיצבה חלק מהפיתוחים האייקוניים ביותר בתל אביב, וזכתה לאמון מפתחים, מתכננים וגופי ממשלה כאחד.',
      ],
      stats: [
        { label: 'פרויקטים שהושלמו', value: '500+' },
        { label: 'חברי צוות', value: '45' },
        { label: 'ציוד מדידה', value: '₪12M' },
        { label: 'שביעות רצון לקוחות', value: '98%' },
      ],
    },
    services: {
      sectionTitle: 'השירותים שלנו',
      headline: 'פתרונות מקיפים לאתגרים מורכבים',
      items: [
        {
          id: 'topographical',
          title: 'סקרים טופוגרפיים',
          description: 'מיפוי שטח ברמת דיוק גבוהה באמצעות LiDAR ופוטוגרמטריה לנתוני גובה מדויקים וניתוח קווי מתאר.',
          features: ['מודלים דיגיטליים של גובה', 'מיפוי קווי מתאר', 'חישובי נפח', 'ניתוח ניקוז'],
        },
        {
          id: 'boundary',
          title: 'סקרי גבולות ומשפטיים',
          description: 'תיחום גבולות נכס מוסמך בהתאם לדרישות רישום המקרקעין בישראל ולסטנדרטים משפטיים.',
          features: ['אימות קווי נכס', 'מיפוי קדסטרלי', 'תיעוד משפטי', 'פתרון סכסוכים'],
        },
        {
          id: 'laser',
          title: 'סריקת לייזר תלת-ממדית',
          description: 'לכידת ענן נקודות ברמת דיוק מילימטרית לתיעוד כפי שנבנה, שימור מורשת ומבנים מורכבים.',
          features: ['עיבוד ענן נקודות', 'שילוב BIM', 'תיעוד מורשת', 'מעקב אחר עיוותים'],
        },
        {
          id: 'drone',
          title: 'מיפוי אווירי',
          description: 'שירותי מיפוי ובדיקה מבוססי רחפנים לפרויקטים בקנה מידה גדול ואזורים שקשה להגיע אליהם.',
          features: ['יצירת אורתופוטו', 'דימוי תרמי', 'מעקב התקדמות', 'מדידת מלאי'],
        },
        {
          id: 'urban',
          title: 'תכנון עירוני',
          description: 'שירותי תכנון מקיפים ממחקרי היתכנות ועד עיצוב עירוני מפורט והתאמה רגולטורית.',
          features: ['תכנון אב', 'ניתוח זונינג', 'השפעה סביבתית', 'מחקרי תנועה'],
        },
        {
          id: 'bim',
          title: 'BIM ותאומים דיגיטליים',
          description: 'מידול מידע בניין ויצירת תאום דיגיטלי לניהול נכשים אינטליגנטי ותפעול מתקנים.',
          features: ['סימולציית בנייה 4D', 'זיהוי התנגשויות', 'ניהול נכסים', 'שילוב מתקנים'],
        },
      ],
    },
    portfolio: {
      sectionTitle: 'תיק עבודות',
      headline: 'פרויקטים המגדירים מצוינות',
      filters: {
        all: 'כל הפרויקטים',
        urban: 'תכנון עירוני',
        topo: 'טופוגרפי',
        modeling: 'מידול תלת-ממדי',
        industrial: 'תעשייתי',
      },
      projects: [
        {
          id: '1',
          title: 'הרחבת מתחם מגדלי עזריאלי',
          category: 'urban',
          location: 'תל אביב',
          year: '2023',
          specs: '45,000 מ"ר | 3 מגדלים | BIM רמה 2',
        },
        {
          id: '2',
          title: 'טרמינל 4 נתב"ג',
          category: 'industrial',
          location: 'לוד',
          year: '2022',
          specs: '180,000 מ"ר | סריקת לייזר | 2.3M נקודות',
        },
        {
          id: '3',
          title: 'פיתוח נמל יפו',
          category: 'urban',
          location: 'יפו',
          year: '2023',
          specs: '12 הקטאר | סקר מורשת | רחפן 4K',
        },
        {
          id: '4',
          title: 'הרחבת אינטל קריית גת',
          category: 'industrial',
          location: 'קריית גת',
          year: '2024',
          specs: '25,000 מ"ר | דיוק ±2מ"מ | 24/7',
        },
        {
          id: '5',
          title: 'הרכבת הקלה שלב ב\'',
          category: 'topo',
          location: 'מטרו תל אביב',
          year: '2023',
          specs: '24 ק"מ | 1,200 חתכים | GNSS RTK',
        },
        {
          id: '6',
          title: 'מגדלי שדרות רוטשילד',
          category: 'modeling',
          location: 'תל אביב',
          year: '2022',
          specs: '65 קומות | מודל 3D | ענן נקודות',
        },
        {
          id: '7',
          title: 'אזור תעשייה מפרץ חיפה',
          category: 'topo',
          location: 'חיפה',
          year: '2021',
          specs: '850 הקטאר | טופוגרפי | קנה מידה 1:500',
        },
        {
          id: '8',
          title: 'תיעוד מורשת ירושלים',
          category: 'modeling',
          location: 'העיר העתיקה, ירושלים',
          year: '2024',
          specs: '15 אתרים | סריקת לייזר | סטנדרט UNESCO',
        },
      ],
    },
    contact: {
      sectionTitle: 'צור קשר',
      headline: 'התחל את הפרויקט שלך',
      form: {
        name: 'שם מלא',
        company: 'חברה / ארגון',
        scope: 'היקף הפרויקט',
        scopeOptions: {
          survey: 'מדידות קרקע',
          planning: 'תכנון עירוני',
          modeling: 'מידול תלת-ממדי / BIM',
          consultation: 'ייעוץ טכני',
          other: 'אחר',
        },
        phone: 'מספר טלפון',
        email: 'כתובת אימייל',
        message: 'פרטי הפרויקט',
        submit: 'שלח פנייה',
        submitting: 'שולח...',
        success: 'תודה! ניצור איתך קשר תוך 24 שעות.',
        error: 'אנא בדוק את המידע ונסה שוב.',
      },
      info: {
        address: 'המסגר 123, תל אביב-יפו, 6721108',
        phone: '03-529-8888',
        email: 'projects@geoprecision.co.il',
        hours: 'א\'-ה\': 08:00-18:00 | ו\': 08:00-12:00',
      },
    },
    footer: {
      rights: '© 2024 גיאופרסיזיין מדידות ואדריכלות. כל הזכויות שמורות.',
      tagline: 'דיוק. חדשנות. מצוינות.',
    },
  },
  ar: {
    nav: {
      about: 'من نحن',
      services: 'الخدمات',
      portfolio: 'المشاريع',
      contact: 'اتصل بنا',
    },
    hero: {
      title: 'الدقة تلتقي بالابتكار',
      subtitle: 'شركة المساحة والهندسة المعمارية الرائدة في تل أبيب، تقدم بيانات جغرافية مكانية دقيقة للمليمتر وحلول تصميمية رؤيوية للتطويرات الحضرية المعقدة.',
      ctaPrimary: 'ابدأ مشروعك',
      ctaSecondary: 'شاهد أعمالنا',
      stats: {
        years: '+25 سنة خبرة',
        projects: '+500 مشروع',
        accuracy: '99.9% دقة',
      },
    },
    about: {
      sectionTitle: 'من نحن',
      headline: 'نحن نهندس مستقبل أفق تل أبيب',
      paragraphs: [
        'تأسست جيوبريسيجن في عام 1999 وأصبحت شركة المساحة والهندسة المعمارية الرائدة في إسرائيل، حيث تجمع بين التكنولوجيا المتطورة وعقود من الخبرة. يخدم فريقنا من المساحين المعتمدين والمهندسين المعماريين ومهندسي المعلومات الجغرافية المكانية أكثر العملاء تطلباً في التخطيط البلدي والتطوير التجاري والبنية التحتية الحكومية.',
        'نحن نعمل عند تقاطع الدقة والابتكار. تلتقط أسطولنا من أنظمة الطائرات بدون طيار المتقدمة، وماسحات الليزر ثلاثية الأبعاد، ومستقبلات GNSS البيانات بدقة أقل من السنتيمتر. هذه الميزة التكنولوجية، بالإضافة إلى فهمنا العميق للأطر التنظيمية الإسرائيلية، تضمن أن كل مشروع يلبي أعلى معايير التميز.',
        'من المسح الطبوغرافي الأولي إلى المخطط المعماري النهائي، نقدم حلولاً شاملة تحول الرؤى إلى واقع. لقد شكل عملنا بعضاً من أكثر التطويرات أيقونية في تل أبيب، مما أكسب ثقة المطورين والمخططين والوكالات الحكومية على حد سواء.',
      ],
      stats: [
        { label: 'المشاريع المنجزة', value: '500+' },
        { label: 'أعضاء الفريق', value: '45' },
        { label: 'معدات المساحة', value: '₪12M' },
        { label: 'رضا العملاء', value: '98%' },
      ],
    },
    services: {
      sectionTitle: 'خدماتنا',
      headline: 'حلول شاملة للتحديات المعقدة',
      items: [
        {
          id: 'topographical',
          title: 'المساحات الطبوغرافية',
          description: 'رسم خرائط التضاريس بدقة عالية باستخدام LiDAR والفوتوغرامتري لبيانات الارتفاع الدقيقة وتحليل الكونتور.',
          features: ['نماذج الارتفاع الرقمية', 'رسم خرائط الكونتور', 'حسابات الحجم', 'تحليل الصرف'],
        },
        {
          id: 'boundary',
          title: 'مساحات الحدود والقانونية',
          description: 'ترسيم حدود الملكية المعتمد المتوافق مع متطلبات سجل الأراضي الإسرائيلي والمعايير القانونية.',
          features: ['التحقق من خط الملكية', 'الخرائط الكاداسترالية', 'التوثيق القانوني', 'حل النزاعات'],
        },
        {
          id: 'laser',
          title: 'المسح الضوئي ثلاثي الأبعاد',
          description: 'التقاط سحابة النقاط بدقة المليمتر للتوثيق كما تم بناؤه، والحفاظ على التراث، والهياكل المعقدة.',
          features: ['معالجة سحابة النقاط', 'تكامل BIM', 'توثيق التراث', 'مراقبة التشوه'],
        },
        {
          id: 'drone',
          title: 'المسح الجوي',
          description: 'خدمات رسم الخرائط والتفتيش القائمة على الطائرات بدون طيار للمشاريع واسعة النطاق والمناطق التي يصعب الوصول إليها.',
          features: ['توليد الصور الملتقطة', 'التصوير الحراري', 'مراقبة التقدم', 'قياس المخزون'],
        },
        {
          id: 'urban',
          title: 'التخطيط الحضري',
          description: 'خدمات تخطيط شاملة من دراسات الجدوى إلى التصميم الحضري المفصل والامتثال التنظيمي.',
          features: ['التخطيط الرئيسي', 'تحليل المناطق', 'التأثير البيئي', 'دراسات المرور'],
        },
        {
          id: 'bim',
          title: 'BIM والتوائم الرقمية',
          description: 'نمذجة معلومات البناء وإنشاء التوأم الرقمي لإدارة الأصول الذكية وتشغيل المرافق.',
          features: ['محاكاة البناء 4D', 'كشف التعارض', 'إدارة الأصول', 'تكامل المرافق'],
        },
      ],
    },
    portfolio: {
      sectionTitle: 'محفظة الأعمال',
      headline: 'مشاريع تحدد التميز',
      filters: {
        all: 'جميع المشاريع',
        urban: 'التخطيط الحضري',
        topo: 'طبوغرافي',
        modeling: 'النمذجة ثلاثية الأبعاد',
        industrial: 'صناعي',
      },
      projects: [
        {
          id: '1',
          title: 'توسيع مجمع أزرييلي',
          category: 'urban',
          location: 'تل أبيب',
          year: '2023',
          specs: '45,000 م² | 3 أبراج | BIM المستوى 2',
        },
        {
          id: '2',
          title: 'مبنى 4 مطار بن غوريون',
          category: 'industrial',
          location: 'اللد',
          year: '2022',
          specs: '180,000 م² | مسح ليزر | 2.3M نقطة',
        },
        {
          id: '3',
          title: 'إعادة تطوير ميناء يافا',
          category: 'urban',
          location: 'يافا',
          year: '2023',
          specs: '12 هكتار | مسح تراث | طائرة 4K',
        },
        {
          id: '4',
          title: 'توسيع إنتل كريات جات',
          category: 'industrial',
          location: 'كريات جات',
          year: '2024',
          specs: '25,000 م² | دقة ±2مم | 24/7',
        },
        {
          id: '5',
          title: 'القطار الخفيف المرحلة 2',
          category: 'topo',
          location: 'مترو تل أبيب',
          year: '2023',
          specs: '24 كم | 1,200 مقطع عرضي | GNSS RTK',
        },
        {
          id: '6',
          title: 'أبراج شارع روتشيلد',
          category: 'modeling',
          location: 'تل أبيب',
          year: '2022',
          specs: '65 طابق | نموذج 3D | سحابة نقاط',
        },
        {
          id: '7',
          title: 'منطقة خليج حيفا الصناعية',
          category: 'topo',
          location: 'حيفا',
          year: '2021',
          specs: '850 هكتار | طبوغرافي | مقياس 1:500',
        },
        {
          id: '8',
          title: 'توثيق تراث القدس',
          category: 'modeling',
          location: 'القدس القديمة',
          year: '2024',
          specs: '15 موقع | مسح ليزر | معيار اليونسكو',
        },
      ],
    },
    contact: {
      sectionTitle: 'اتصل بنا',
      headline: 'ابدأ مشروعك',
      form: {
        name: 'الاسم الكامل',
        company: 'الشركة / المنظمة',
        scope: 'نطاق المشروع',
        scopeOptions: {
          survey: 'مساحة الأراضي',
          planning: 'التخطيط الحضري',
          modeling: 'النمذجة ثلاثية الأبعاد / BIM',
          consultation: 'الاستشارات الفنية',
          other: 'أخرى',
        },
        phone: 'رقم الهاتف',
        email: 'عنوان البريد الإلكتروني',
        message: 'تفاصيل المشروع',
        submit: 'إرسال الاستفسار',
        submitting: 'جاري الإرسال...',
        success: 'شكراً! سنتواصل معك خلال 24 ساعة.',
        error: 'يرجى التحقق من المعلومات والمحاولة مرة أخرى.',
      },
      info: {
        address: '123 شارع هاماسجير، تل أبيب-يافا، 6721108',
        phone: '+972 3-529-8888',
        email: 'projects@geoprecision.co.il',
        hours: 'الأحد-الخميس: 08:00-18:00 | الجمعة: 08:00-12:00',
      },
    },
    footer: {
      rights: '© 2024 جيوبريسيجن للمساحة والهندسة المعمارية. جميع الحقوق محفوظة.',
      tagline: 'الدقة. الابتكار. التميز.',
    },
  },
};

// Portfolio project images mapping
export const projectImages: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  '2': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
  '3': 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&q=80',
  '4': 'https://images.unsplash.com/photo-1565514020176-db98e3c15463?w=800&q=80',
  '5': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  '6': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  '7': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  '8': 'https://images.unsplash.com/photo-1548625361-188864d437b5?w=800&q=80',
};

// Service icons mapping
export const serviceIcons: Record<string, string> = {
  topographical: 'Mountain',
  boundary: 'MapPin',
  laser: 'Scan',
  drone: 'Plane',
  urban: 'Building2',
  bim: 'Box',
};

// Company info
export const companyInfo = {
  name: 'GeoPrecision',
  fullName: 'GeoPrecision Surveying & Architecture',
  founded: 1999,
  address: {
    street: '123 HaMasger Street',
    city: 'Tel Aviv-Yafo',
    postal: '6721108',
    country: 'Israel',
  },
  contact: {
    phone: '+972 3-529-8888',
    email: 'projects@geoprecision.co.il',
    fax: '+972 3-529-8889',
  },
  social: {
    linkedin: 'https://linkedin.com/company/geoprecision',
    instagram: 'https://instagram.com/geoprecision',
  },
  certifications: [
    'ISO 9001:2015',
    'ISO 14001:2015',
    'Israel Land Registry Certified',
    'Ministry of Finance Contractor',
  ],
};

// Navigation links
export const navLinks = [
  { href: '#about', key: 'about' },
  { href: '#services', key: 'services' },
  { href: '#portfolio', key: 'portfolio' },
  { href: '#contact', key: 'contact' },
];

// Language display names
export const languageNames: Record<Language, string> = {
  en: 'English',
  he: 'עברית',
  ar: 'العربية',
};

// RTL languages
export const rtlLanguages: Language[] = ['he', 'ar'];

// Default language
export const defaultLanguage: Language = 'en';
