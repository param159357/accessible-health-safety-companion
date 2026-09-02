/**
 * Accessible Multimodal Health & Safety Companion
 * Core interactive controller, full-page vanilla i18n translation, WebGL ambient background, WhatsApp SOS dispatch, and AI triage.
 */

(() => {
  'use strict';

  const EMERGENCY_PHONE = '918250666852';

  // Static UI Translations Dictionary for 7 Local Languages
  const i18nDictionary = {
    English: {
      system_status: 'CAMPUS EMERGENCY RESPONSE SYSTEM • LIVE 24/7',
      brand_title: 'Accessible Multimodal Health & Safety Companion',
      brand_subtitle: 'Rapid First-Aid Protocols & Instant WhatsApp SOS Dispatch (112 / +91 8250666852)',
      lang_label: 'Language:',
      sos_tag: '🚨 IMMEDIATE ASSISTANCE',
      sos_title: 'Campus Emergency SOS Dispatch',
      sos_desc: 'Direct emergency line to Campus Security, EMS, and First Responders via WhatsApp (+91 8250666852) and Helpline 112.',
      quick_location_label: 'Quick Pick:',
      sos_location_label: 'Emergency Location:',
      sos_location_placeholder: 'e.g., Chemistry Hall Room 302 or Main Library',
      sos_btn_text: 'DISPATCH SOS TO WHATSAPP',
      quick_help_title: 'Instant Quick-Help First-Aid Protocols',
      quick_help_subtitle: 'Zero-latency, verified emergency steps for immediate campus hazards. Select an emergency below:',
      btn_cuts_name: 'Cuts & Bleeding',
      btn_cuts_desc: 'Hemorrhage control',
      btn_burns_name: 'Thermal Burns',
      btn_burns_desc: 'Cool water protocol',
      btn_chem_name: 'Chemical Exposure',
      btn_chem_desc: 'Flush & decontamination',
      btn_shock_name: 'Electric Shock',
      btn_shock_desc: 'Power cutoff & CPR triage',
      btn_faint_name: 'Fainting & Syncope',
      btn_faint_desc: 'Elevation & recovery',
      protocol_placeholder: 'Select any emergency button above to load instant, step-by-step first-aid protocols with safety precautions.',
      ai_title: 'AI Hazard Triage',
      ai_subtitle: 'Interactive multimodal assistant. Describe what happened or attach a photo for immediate analysis & emergency WhatsApp routing.',
      quick_scenario_label: 'Quick Scenario:',
      form_legend: 'Emergency Incident Details',
      desc_label: 'Incident Description:',
      desc_optional: '(Optional if photo attached)',
      desc_placeholder: 'e.g., Worker splashed with clear liquid in Battery Lab 104, experiencing skin irritation...',
      photo_label: 'Hazard Photo Upload:',
      photo_optional: '(PNG, JPEG, WebP - max 5MB)',
      remove_photo: 'Remove Photo',
      analyze_btn: 'Analyze Hazard & Triage Protocol',
      loading_text: 'Analyzing multimodal hazard evidence and generating structured protocols with Gemini...',
      footer_copy: 'Campus Health & Safety System • Accessible Multimodal First-Aid Companion • Built for Rapid Emergency Response',
      footer_disclaimer: 'Emergency Disclaimer: This companion simulates triage and provides automated guidance. In life-threatening emergencies, always dial 112 or alert emergency responders immediately.',
    },
    Hindi: {
      system_status: 'परिसर आपातकालीन प्रतिक्रिया प्रणाली • लाइव 24/7',
      brand_title: 'सुलभ मल्टीमॉडल स्वास्थ्य एवं सुरक्षा साथी',
      brand_subtitle: 'त्वरित प्राथमिक उपचार और सीधा व्हाट्सएप एसओएस प्रेषण (112 / +91 8250666852)',
      lang_label: 'भाषा:',
      sos_tag: '🚨 तत्काल सहायता',
      sos_title: 'परिसर आपातकालीन एसओएस प्रेषण',
      sos_desc: 'व्हाट्सएप (+91 8250666852) और हेल्पलाइन 112 द्वारा परिसर सुरक्षा और ईएमएस से सीधा संपर्क।',
      quick_location_label: 'त्वरित स्थान:',
      sos_location_label: 'आपातकालीन स्थान:',
      sos_location_placeholder: 'जैसे रसायन विज्ञान कक्ष ३०२ या मुख्य पुस्तकालय',
      sos_btn_text: 'व्हाट्सएप पर एसओएस भेजें',
      quick_help_title: 'त्वरित प्राथमिक उपचार निर्देश',
      quick_help_subtitle: 'परिसर आपात स्थितियों के लिए त्वरित और सत्यापित प्राथमिक उपचार। नीचे आपातकाल चुनें:',
      btn_cuts_name: 'कटना और रक्तस्राव',
      btn_cuts_desc: 'रक्तस्राव नियंत्रण',
      btn_burns_name: 'गर्मी से जलना',
      btn_burns_desc: 'ठंडे पानी का उपचार',
      btn_chem_name: 'रासायनिक रिसाव',
      btn_chem_desc: 'धुलाई और सफाई',
      btn_shock_name: 'बिजली का झटका',
      btn_shock_desc: 'बिजली बंद व सीपीआर',
      btn_faint_name: 'बेहोशी और चक्कर',
      btn_faint_desc: 'पैर उठाना व देखभाल',
      protocol_placeholder: 'त्वरित और चरणबद्ध प्राथमिक उपचार निर्देश देखने के लिए ऊपर दिए गए किसी भी बटन पर क्लिक करें।',
      ai_title: 'एआई खतरा त्वरित जांच',
      ai_subtitle: 'त्वरित एआई सहायक। घटना का विवरण दें या फोटो संलग्न करें।',
      quick_scenario_label: 'त्वरित उदाहरण:',
      form_legend: 'आपातकालीन घटना का विवरण',
      desc_label: 'घटना का विवरण:',
      desc_optional: '(तस्वीर संलग्न होने पर वैकल्पिक)',
      desc_placeholder: 'जैसे बैटरी लैब में कर्मचारी पर तरल पदार्थ गिरा और त्वचा में जलन हो रही है...',
      photo_label: 'खतरे की तस्वीर अपलोड करें:',
      photo_optional: '(PNG, JPEG, WebP - अधिकतम 5MB)',
      remove_photo: 'तस्वीर हटाएं',
      analyze_btn: 'खतरे का विश्लेषण करें और प्रोटोकॉल प्राप्त करें',
      loading_text: 'जेमिनी एआई के साथ खतरे का विश्लेषण और प्राथमिक उपचार प्रोटोकॉल तैयार किया जा रहा है...',
      footer_copy: 'परिसर स्वास्थ्य एवं सुरक्षा प्रणाली • सुलभ मल्टीमॉडल साथी • त्वरित आपातकालीन प्रतिक्रिया',
      footer_disclaimer: 'आपातकालीन अस्वीकरण: यह साथी मार्गदर्शन प्रदान करता है। गंभीर आपात स्थिति में तुरंत 112 डायल करें।',
    },
    Bengali: {
      system_status: 'ক্যাম্পাস জরুরি সহায়তা ব্যবস্থা • ২৪/৭ সক্রিয়',
      brand_title: 'অ্যাক্সেসযোগ্য মাল্টিমোডাল স্বাস্থ্য ও সুরক্ষা সহচর',
      brand_subtitle: 'দ্রুত প্রাথমিক চিকিৎসা প্রোটোকল ও হোয়াটসঅ্যাপ এসওএস ডিসপ্যাচ (১১২ / +৯১ ৮২৫০৬৬৬৮৫২)',
      lang_label: 'ভাষা:',
      sos_tag: '🚨 জরুরি সহায়তা',
      sos_title: 'ক্যাম্পাস জরুরি এসওএস ডিসপ্যাচ',
      sos_desc: 'হোয়াটসঅ্যাপ (+91 8250666852) এবং ১১২ হেল্পলাইনের মাধ্যমে সরাসরি জরুরি সাহায্য।',
      quick_location_label: 'দ্রুত নির্বাচন:',
      sos_location_label: 'জরুরি স্থান:',
      sos_location_placeholder: 'যেমন কেমিস্ট্রি হল রুম ৩০২ বা লাইব্রেরি',
      sos_btn_text: 'হোয়াটসঅ্যাপে এসওএস পাঠান',
      quick_help_title: 'তাত্ক্ষণিক প্রাথমিক চিকিৎসা প্রোটোকল',
      quick_help_subtitle: 'ক্যাম্পাস দুর্ঘটনার জন্য তাৎক্ষণিক নির্দেশাবলী। নিচে একটি জরুরি অবস্থা নির্বাচন করুন:',
      btn_cuts_name: 'কাটা ও রক্তপাত',
      btn_cuts_desc: 'রক্তপাত নিয়ন্ত্রণ',
      btn_burns_name: 'আগুনে পোড়া',
      btn_burns_desc: 'ঠান্ডা পানির চিকিৎসা',
      btn_chem_name: 'রাসায়নিক এক্সপোজার',
      btn_chem_desc: 'পানি দিয়ে ধোয়া',
      btn_shock_name: 'বৈদ্যুতিক শক',
      btn_shock_desc: 'বিদ্যুৎ বন্ধ ও সিপিআর',
      btn_faint_name: 'অজ্ঞান হওয়া',
      btn_faint_desc: 'পা উপরে তোলা',
      protocol_placeholder: 'ধাপে ধাপে প্রাথমিক চিকিৎসা দেখতে উপরের যে কোনো বোতামে ক্লিক করুন।',
      ai_title: 'এআই বিপদ মূল্যায়ন',
      ai_subtitle: 'ইন্টারেক্টিভ এআই সহকারী। দ্রুত বিশ্লেষণের জন্য বর্ণনা বা ছবি দিন।',
      quick_scenario_label: 'উদাহরণ:',
      form_legend: 'জরুরি ঘটনার বিবরণ',
      desc_label: 'ঘটনার বিবরণ:',
      desc_optional: '(ছবি সংযুক্ত থাকলে ঐচ্ছিক)',
      desc_placeholder: 'যেমন ল্যাবে তরল ছিটকে পড়েছে এবং ত্বকে জ্বালাপোড়া হচ্ছে...',
      photo_label: 'বিপদের ছবি আপলোড করুন:',
      photo_optional: '(PNG, JPEG, WebP - সর্বোচ্চ 5MB)',
      remove_photo: 'ছবি সরান',
      analyze_btn: 'বিপদ বিশ্লেষণ করুন ও প্রোটোকল পান',
      loading_text: 'মাল্টিমোডাল প্রমাণ বিশ্লেষণ এবং জেমিমির সাথে প্রোটোকল তৈরি করা হচ্ছে...',
      footer_copy: 'ক্যাম্পাস স্বাস্থ্য ও নিরাপত্তা ব্যবস্থা • জরুরি সহায়ক সহচর',
      footer_disclaimer: 'জরুরি নোটিশ: এটি স্বয়ংক্রিয় নির্দেশনা প্রদান করে। মারাত্মক ঝুঁকিতে অবিলম্বে ১১২ নম্বরে ফোন করুন।',
    },
    Marathi: {
      system_status: 'कॅम्पस आणीबाणी प्रतिसाद प्रणाली • २४/७ कार्यरत',
      brand_title: 'सुलभ मल्टीमॉडल आरोग्य आणि सुरक्षा साथीदार',
      brand_subtitle: 'त्वरित प्रथमोपचार नियम आणि थेट व्हॉट्सॲप एसओएस प्रेषण (११२ / +९१ ८२५०६६६८५२)',
      lang_label: 'भाषा:',
      sos_tag: '🚨 तातडीची मदत',
      sos_title: 'कॅम्पस आणीबाणी एसओएस प्रेषण',
      sos_desc: 'व्हॉट्सॲप (+91 8250666852) आणि हेल्पलाइन ११२ द्वारे कॅम्पस सुरक्षा आणि वैद्यकीय पथकाशी थेट संपर्क.',
      quick_location_label: 'त्वरित ठिकाण:',
      sos_location_label: 'आणीबाणीचे ठिकाण:',
      sos_location_placeholder: 'उदा. केमिस्ट्री लॅब ३०२ किंवा मुख्य ग्रंथालय',
      sos_btn_text: 'व्हॉट्सॲपवर एसओएस पाठवा',
      quick_help_title: 'त्वरित प्रथमोपचार नियम',
      quick_help_subtitle: 'कॅम्पसमधील अपघातांसाठी त्वरित आणि सुरक्षित प्रथमोपचार. खालील पर्याय निवडा:',
      btn_cuts_name: 'जखम व रक्तस्राव',
      btn_cuts_desc: 'रक्तस्राव नियंत्रण',
      btn_burns_name: 'उष्णतेने भाजणे',
      btn_burns_desc: 'थंड पाण्याचा उपचार',
      btn_chem_name: 'रासायनिक गळती',
      btn_chem_desc: 'स्वच्छतेची प्रक्रिया',
      btn_shock_name: 'विजेचा धक्का',
      btn_shock_desc: 'वीज बंद व सीपीआर',
      btn_faint_name: 'बेशुद्ध पडणे',
      btn_faint_desc: 'पाय वर उचलणे',
      protocol_placeholder: 'सविस्तर प्रथमोपचार माहितीसाठी वरील कोणत्याही बटनावर क्लिक करा.',
      ai_title: 'एआय धोका विश्लेषण',
      ai_subtitle: 'त्वरित एआय सहाय्यक. विश्लेषण मिळवण्यासाठी माहिती द्या किंवा फोटो जोडा.',
      quick_scenario_label: 'उदाहरणे:',
      form_legend: 'घटनेचा तपशील',
      desc_label: 'घटनेचे वर्णन:',
      desc_optional: '(फोटो जोडल्यास ऐच्छिक)',
      desc_placeholder: 'उदा. बॅटरी लॅबमध्ये अंगावर रसायन सांडले आणि त्वचेची जळजळ होत आहे...',
      photo_label: 'धोक्याचा फोटो अपलोड करा:',
      photo_optional: '(PNG, JPEG, WebP - कमाल 5MB)',
      remove_photo: 'फोटो काढा',
      analyze_btn: 'धोक्याचे विश्लेषण करा आणि उपाय मिळवा',
      loading_text: 'जेमिनी एआय सह धोक्याचे विश्लेषण आणि प्रथमोपचार सूचना तयार केल्या जात आहेत...',
      footer_copy: 'कॅम्पस आरोग्य आणि सुरक्षा प्रणाली • सुलभ साथीदार',
      footer_disclaimer: 'आणीबाणी सूचना: हे मार्गदर्शन पुरवते. जीवघेण्या प्रसंगी थेट ११२ क्रमांकावर संपर्क साधा.',
    },
    Telugu: {
      system_status: 'క్యాంపస్ ఎమర్జెన్సీ రెస్పాన్స్ సిస్టమ్ • 24/7 లైవ్',
      brand_title: 'సులభ మల్టీమోడల్ ఆరోగ్య మరియు భద్రతా సహచరి',
      brand_subtitle: 'త్వరిత ప్రథమ చికిత్స & వాట్సాప్ SOS డిస్పాచ్ (112 / +91 8250666852)',
      lang_label: 'భాష:',
      sos_tag: '🚨 తక్షణ సహాయం',
      sos_title: 'క్యాంపస్ ఎమర్జెన్సీ SOS డిస్పాచ్',
      sos_desc: 'వాట్సాప్ (+91 8250666852) మరియు హెల్ప్‌లైన్ 112 ద్వారా క్యాంపస్ భద్రతా సిబ్బందితో ప్రత్యక్ష కనెక్షన్.',
      quick_location_label: 'త్వరిత స్థానం:',
      sos_location_label: 'అత్యవసర స్థానం:',
      sos_location_placeholder: 'ఉదా. కెమిస్ట్రీ ల్యాబ్ గది 302 లేదా లైబ్రరీ',
      sos_btn_text: 'వాట్సాప్‌కు SOS పంపండి',
      quick_help_title: 'తక్షణ ప్రథమ చికిత్స సూచనలు',
      quick_help_subtitle: 'క్యాంపస్ ప్రమాదాల నివారణకు తక్షణ సూచనలు. కింద ఎంపిక చేయండి:',
      btn_cuts_name: 'గాయాలు & రక్తస్రావం',
      btn_cuts_desc: 'రక్తస్రావ నియంత్రణ',
      btn_burns_name: 'కాలిన గాయాలు',
      btn_burns_desc: 'చల్లటి నీటి చికిత్స',
      btn_chem_name: 'రసాయన ప్రమాదం',
      btn_chem_desc: 'నీటితో శుభ్రం చేయడం',
      btn_shock_name: 'విద్యుత్ షాక్',
      btn_shock_desc: 'కరెంట్ ఆఫ్ & CPR',
      btn_faint_name: 'స్పృహ తప్పడం',
      btn_faint_desc: 'కాళ్లను పైకి ఎత్తడం',
      protocol_placeholder: 'ప్రథమ చికిత్స వివరాలను చూడటానికి పైన ఉన్న ఏదైనా బటన్‌ను నొక్కండి.',
      ai_title: 'AI ప్రమాద విశ్లేషణ',
      ai_subtitle: 'ఇంటరాక్టివ్ AI అసిస్టెంట్. సమాచారం లేదా ఫోటో జోడించండి.',
      quick_scenario_label: 'ఉదాహరణలు:',
      form_legend: 'ప్రమాద వివరాలు',
      desc_label: 'ప్రమాద వివరణ:',
      desc_optional: '(ఫోటో ఉంటే ఐచ్ఛికం)',
      desc_placeholder: 'ఉదా. ల్యాబ్‌లో రసాయనం పడి చర్మం మండుతోంది...',
      photo_label: 'ప్రమాద ఫోటోను అప్‌లోడ్ చేయండి:',
      photo_optional: '(PNG, JPEG, WebP - గరిష్టంగా 5MB)',
      remove_photo: 'ఫోటోను తొలగించండి',
      analyze_btn: 'ప్రమాదాన్ని విశ్లేషించండి & సమాచారం పొందండి',
      loading_text: 'జెమిని AI ద్వారా ప్రమాద విశ్లేషణ మరియు నివేదిక సిద్ధం చేయబడుతోంది...',
      footer_copy: 'క్యాంపస్ ఆరోగ్య మరియు భద్రతా వ్యవస్థ • అత్యవసర సహాయం',
      footer_disclaimer: 'అత్యవసర గమనిక: ప్రాణాపాయ స్థితిలో వెంటనే 112 కు కాల్ చేయండి.',
    },
    Tamil: {
      system_status: 'வளாக அவசர உதவி அமைப்பு • 24/7 நேரலை',
      brand_title: 'அணுகக்கூடிய மல்டிமாடல் சுகாதாரம் & பாதுகாப்பு துணை',
      brand_subtitle: 'விரைவான முதலுதவி நெறிமுறைகள் & வாட்ஸ்அப் SOS அனுப்புகை (112 / +91 8250666852)',
      lang_label: 'மொழி:',
      sos_tag: '🚨 உடனடி உதவி',
      sos_title: 'வளாக அவசர SOS அனுப்புகை',
      sos_desc: 'வாட்ஸ்அப் (+91 8250666852) மற்றும் 112 ஹெல்ப்லைன் மூலம் நேரடி தொடர்பு.',
      quick_location_label: 'விரைவு இடம்:',
      sos_location_label: 'அவசர இருப்பிடம்:',
      sos_location_placeholder: 'எ.கா. வேதியியல் ஆய்வகம் 302 அல்லது நூலகம்',
      sos_btn_text: 'வாட்ஸ்அப் SOS அனுப்புக',
      quick_help_title: 'உடனடி முதலுதவி நெறிமுறைகள்',
      quick_help_subtitle: 'வளாக அவசரநிலைகளுக்கு உடனடி மற்றும் சரிபார்க்கப்பட்ட வழிமுறைகள்:',
      btn_cuts_name: 'காயங்கள் & இரத்தப்போக்கு',
      btn_cuts_desc: 'இரத்தப்போக்கு கட்டுப்பாடு',
      btn_burns_name: 'தீக்காயங்கள்',
      btn_burns_desc: 'குளிர்ந்த நீர் சிகிச்சை',
      btn_chem_name: 'இரசாயன கசிவு',
      btn_chem_desc: 'நீர் கொண்டு கழுவுதல்',
      btn_shock_name: 'மின் அதிர்ச்சி',
      btn_shock_desc: 'மின்சாரம் அணைப்பு & சிபிஆர்',
      btn_faint_name: 'மயக்கம் அடைதல்',
      btn_faint_desc: 'கால்களை உயர்த்துதல்',
      protocol_placeholder: 'முதலுதவி வழிமுறைகளைக் காண மேலே உள்ள ஏதேனும் ஒரு பொத்தானைக் கிளிக் செய்யவும்.',
      ai_title: 'AI அவசர வழிகாட்டி',
      ai_subtitle: 'உடனடி AI வழிகாட்டல். சம்பவம் பற்றிய விவரங்கள் அல்லது புகைப்படத்தைப் பகிரவும்.',
      quick_scenario_label: 'உதாரணங்கள்:',
      form_legend: 'அவசர சம்பவத்தின் விவரங்கள்',
      desc_label: 'சம்பவ விளக்கம்:',
      desc_optional: '(புகைப்படம் இருந்தால் விருப்பத்திற்குரியது)',
      desc_placeholder: 'எ.கா. ஆய்வகத்தில் திரவம் கொட்டி தோலில் எரிச்சல் ஏற்படுகிறது...',
      photo_label: 'ஆபத்து புகைப்படத்தை பதிவேற்றவும்:',
      photo_optional: '(PNG, JPEG, WebP - அதிகபட்சம் 5MB)',
      remove_photo: 'புகைப்படத்தை அகற்று',
      analyze_btn: 'ஆபத்தை பகுப்பாய்வு செய்து வழிகாட்டலைப் பெறுங்கள்',
      loading_text: 'ஜெமினி AI உடன் ஆபத்து பகுப்பாய்வு செய்யப்பட்டு முதலுதவி நெறிமுறைகள் உருவாக்கப்படுகின்றன...',
      footer_copy: 'வளாக சுகாதாரம் மற்றும் பாதுகாப்பு அமைப்பு • உடனடி அவசர உதவி',
      footer_disclaimer: 'அவசர அறிவிப்பு: உயிருக்கு ஆபத்தான சூழ்நிலைகளில் உடனடியாக 112 ஐ அழைக்கவும்.',
    },
    Gujarati: {
      system_status: 'કેમ્પસ ઇમરજન્સી રિસ્પોન્સ સિસ્ટમ • ૨૪/૭ લાઈવ',
      brand_title: 'સુલભ મલ્ટિમોડલ આરોગ્ય અને સુરક્ષા સાથી',
      brand_subtitle: 'ઝડપી પ્રાથમિક સારવાર અને સીધો વ્હોટ્સએપ SOS ડિસ્પેચ (૧૧૨ / +૯૧ ૮૨૫૦૬૬૬૮૫૨)',
      lang_label: 'ભાષા:',
      sos_tag: '🚨 તાત્કાલિક સહાય',
      sos_title: 'કેમ્પસ ઇમરજન્સી SOS ડિસ્પેચ',
      sos_desc: 'વ્હોટ્સએપ (+91 8250666852) અને ૧૧૨ હેલ્પલાઇન દ્વારા સુરક્ષા ટીમ સાથે સીધો સંપર્ક.',
      quick_location_label: 'ઝડપી સ્થળ:',
      sos_location_label: 'ઇમરજન્સી સ્થળ:',
      sos_location_placeholder: 'દા.ત. કેમિસ્ટ્રી લેબ રૂમ ૩૦૨ અથવા લાઈબ્રેરી',
      sos_btn_text: 'વ્હોટ્સએપ પર SOS મોકલો',
      quick_help_title: 'ઝડપી પ્રાથમિક સારવાર માર્ગદર્શિકા',
      quick_help_subtitle: 'કેમ્પસ અકસ્માતો માટે તાત્કાલિક માર્ગદર્શિકા. નીચે કટોકટી પસંદ કરો:',
      btn_cuts_name: 'ઘા અને રક્તસ્રાવ',
      btn_cuts_desc: 'રક્તસ્રાવ નિયંત્રણ',
      btn_burns_name: 'દાઝવું અને બળતરા',
      btn_burns_desc: 'ઠંડા પાણીની સારવાર',
      btn_chem_name: 'રાસાયણિક પ્રદૂષણ',
      btn_chem_desc: 'સફાઈ અને ધોવાની પ્રક્રિયા',
      btn_shock_name: 'વીજળીનો આંચકો',
      btn_shock_desc: 'વીજળી બંધ અને સીપીઆર',
      btn_faint_name: 'ચક્કર અને બેભાન',
      btn_faint_desc: 'પગ ઊંચા કરવા',
      protocol_placeholder: 'પ્રાથમિક સારવારના પગલાં જોવા માટે ઉપરના કોઈપણ બટન પર ક્લિક કરો.',
      ai_title: 'AI જોખમ મૂલ્યાંકન',
      ai_subtitle: 'ઇન્ટરેક્ટિવ AI સહાયક. વિગતો આપો અથવા ફોટો જોડો.',
      quick_scenario_label: 'ઉદાહરણો:',
      form_legend: 'ઇમરજન્સી ઘટનાની વિગત',
      desc_label: 'ઘટનાનું વર્ણન:',
      desc_optional: '(ફોટો હોય તો વૈકલ્પિક)',
      desc_placeholder: 'દા.ત. લેબમાં કેમિકલ પડ્યું અને ત્વચા પર બળતરા થાય છે...',
      photo_label: 'જોખમનો ફોટો અપલોડ કરો:',
      photo_optional: '(PNG, JPEG, WebP - મહત્તમ 5MB)',
      remove_photo: 'ફોટો દૂર કરો',
      analyze_btn: 'જોખમનું વિશ્લેષણ કરો અને માર્ગદર્શન મેળવો',
      loading_text: 'જેમિની AI દ્વારા જોખમનું વિશ્લેષણ અને પ્રાથમિક સારવાર માર્ગદર્શિકા તૈયાર થઈ રહી છે...',
      footer_copy: 'કેમ્પસ આરોગ્ય અને સુરક્ષા વ્યવસ્થા • તાત્કાલિક ઇમરજન્સી સાથી',
      footer_disclaimer: 'ઇમરજન્સી સૂચના: ગંભીર સ્થિતિમાં તાત્કાલિક ૧૧૨ પર સંપર્ક કરો.',
    }
  };

  // State Management
  const state = {
    selectedLanguage: 'English',
    protocols: [],
    activeProtocolId: null,
    uploadedImageBase64: null,
    lastAiResult: null,
    isThreeJsPaused: false,
  };

  // DOM Elements
  const elements = {
    bgCanvas: document.getElementById('bg-canvas'),
    srAnnouncements: document.getElementById('sr-announcements'),
    languageSelect: document.getElementById('language-select'),
    quickHelpGrid: document.querySelector('.quick-help-grid'),
    protocolPlaceholderText: document.getElementById('protocol-placeholder-text'),
    protocolContent: document.getElementById('protocol-content'),
    hazardForm: document.getElementById('hazard-form'),
    hazardDescInput: document.getElementById('hazard-description'),
    hazardImageInput: document.getElementById('hazard-image-input'),
    imagePreviewWrapper: document.getElementById('image-preview-wrapper'),
    imagePreview: document.getElementById('image-preview'),
    removeImageBtn: document.getElementById('remove-image-btn'),
    analyzeSubmitBtn: document.getElementById('analyze-submit-btn'),
    aiLoadingContainer: document.getElementById('ai-loading-container'),
    aiResultContainer: document.getElementById('ai-result-container'),
    sosTriggerBtn: document.getElementById('sos-trigger-btn'),
    sosLocationInput: document.getElementById('sos-location-input'),
    sosResultContainer: document.getElementById('sos-result-container'),
  };

  /**
   * Announce messages to screen readers using ARIA live regions.
   * @param {string} message
   */
  function announceToScreenReader(message) {
    if (elements.srAnnouncements) {
      elements.srAnnouncements.textContent = '';
      setTimeout(() => {
        elements.srAnnouncements.textContent = message;
      }, 50);
    }
  }

  /**
   * Translate all static UI elements on the page according to chosen language.
   * @param {string} lang
   */
  function applyUiTranslations(lang) {
    const dict = i18nDictionary[lang] || i18nDictionary.English;

    // Update text content for all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update placeholder attributes for inputs/textareas with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && dict[key]) {
        el.placeholder = dict[key];
      }
    });
  }

  /**
   * Initialize decorative Three.js ambient background particles with optimized frame throttling.
   */
  function initDecorativeWebGL() {
    if (!window.THREE || !elements.bgCanvas) return;

    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 35;

      const renderer = new THREE.WebGLRenderer({
        canvas: elements.bgCanvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // Create soft, micro circular particles for a clean, non-obtrusive ambient glow
      const particleCount = 50;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorPalette = [
        new THREE.Color('#3b82f6'),
        new THREE.Color('#0284c7'),
        new THREE.Color('#64748b'),
        new THREE.Color('#ef4444'),
      ];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

        const pickedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = pickedColor.r;
        colors[i * 3 + 1] = pickedColor.g;
        colors[i * 3 + 2] = pickedColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const dotCanvas = document.createElement('canvas');
      dotCanvas.width = 16;
      dotCanvas.height = 16;
      const ctx = dotCanvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.arc(8, 8, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      const particleTexture = new THREE.CanvasTexture(dotCanvas);

      const material = new THREE.PointsMaterial({
        size: 0.8,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });

      const particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      let lastFrameTime = 0;
      const fpsInterval = 1000 / 30; // Throttle to 30 FPS for battery & CPU efficiency

      function renderLoop(currentTime) {
        if (!state.isThreeJsPaused && !prefersReducedMotion) {
          const elapsed = currentTime - lastFrameTime;
          if (elapsed > fpsInterval) {
            lastFrameTime = currentTime - (elapsed % fpsInterval);
            particleSystem.rotation.y += 0.0004;
            particleSystem.rotation.x += 0.0002;
            renderer.render(scene, camera);
          }
        }
        requestAnimationFrame(renderLoop);
      }

      if (!prefersReducedMotion) {
        requestAnimationFrame(renderLoop);
      } else {
        renderer.render(scene, camera);
      }

      // Visibility & Sleep Handlers
      document.addEventListener('visibilitychange', () => {
        state.isThreeJsPaused = document.hidden;
      });

      // Resize Listener
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (prefersReducedMotion) {
          renderer.render(scene, camera);
        }
      });
    } catch (err) {
      // Gracefully silent fallback if WebGL is unavailable
    }
  }

  /**
   * GSAP staggered entrance animations.
   */
  function initGsapAnimations() {
    if (!window.gsap) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    try {
      gsap.from('.app-header', {
        opacity: 0,
        y: -12,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.from('.card', {
        opacity: 0,
        y: 16,
        duration: 0.45,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.1,
      });
    } catch (e) {
      // Graceful fallback
    }
  }

  /**
   * Fetch Quick Help protocol data.
   */
  async function loadProtocols() {
    try {
      const res = await fetch('/data/protocols.json');
      if (res.ok) {
        const data = await res.json();
        state.protocols = data.protocols || [];
      }
    } catch (e) {
      state.protocols = [
        {
          id: 'cuts_bleeding',
          title: 'Cuts & Severe Bleeding',
          severity: 'High',
          steps: [
            'Wear protective gloves if available.',
            'Apply firm continuous direct pressure to wound with sterile dressing.',
            'Elevate injured limb above heart if no fracture suspected.',
            'Hold continuous pressure for 10 minutes.',
            'Add more dressing on top if bleeding soaks through.'
          ],
          warning: 'Do NOT remove embedded objects. Never apply improvised tourniquet unless certified.',
          translations: {}
        }
      ];
    }
  }

  /**
   * Render the chosen protocol safely without innerHTML for user safety.
   * @param {string} protocolId
   */
  function renderProtocol(protocolId) {
    const protocol = state.protocols.find(p => p.id === protocolId);
    if (!protocol) return;

    state.activeProtocolId = protocolId;

    // Update button states
    document.querySelectorAll('.protocol-btn').forEach(btn => {
      const isSelected = btn.getAttribute('data-protocol-id') === protocolId;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-expanded', isSelected ? 'true' : 'false');
    });

    // Check for translation
    let title = protocol.title;
    let steps = protocol.steps;
    let warning = protocol.warning;

    if (state.selectedLanguage !== 'English' && protocol.translations && protocol.translations[state.selectedLanguage]) {
      const trans = protocol.translations[state.selectedLanguage];
      if (trans.title) title = trans.title;
      if (trans.steps) steps = trans.steps;
      if (trans.warning) warning = trans.warning;
    }

    // Clear previous content
    elements.protocolPlaceholderText.classList.add('hidden');
    elements.protocolContent.textContent = '';
    elements.protocolContent.classList.remove('hidden');

    const card = document.createElement('div');
    card.className = 'protocol-card';

    // Header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'protocol-card-header';

    const titleEl = document.createElement('h3');
    titleEl.className = 'protocol-card-title';
    titleEl.textContent = `${protocol.icon || '🩹'} ${title}`;

    const severityPill = document.createElement('span');
    const severityLower = (protocol.severity || 'Medium').toLowerCase();
    severityPill.className = `severity-pill severity-${severityLower}`;
    severityPill.textContent = `Severity: ${protocol.severity}`;

    cardHeader.appendChild(titleEl);
    cardHeader.appendChild(severityPill);
    card.appendChild(cardHeader);

    // Numbered Steps
    const stepsList = document.createElement('ol');
    stepsList.className = 'protocol-steps-list';

    steps.forEach(stepText => {
      const li = document.createElement('li');
      li.textContent = stepText;
      stepsList.appendChild(li);
    });
    card.appendChild(stepsList);

    // Warning
    if (warning) {
      const warningBox = document.createElement('div');
      warningBox.className = 'protocol-warning-box';
      const warningStrong = document.createElement('strong');
      warningStrong.textContent = 'Critical Safety Warning: ';
      warningBox.appendChild(warningStrong);
      warningBox.appendChild(document.createTextNode(warning));
      card.appendChild(warningBox);
    }

    elements.protocolContent.appendChild(card);
    announceToScreenReader(`Loaded emergency protocol for ${title}. Severity level is ${protocol.severity}.`);
  }

  /**
   * Client-side canvas compression: Resizes and compresses image before base64 encoding to reduce upload payload by >90%.
   * @param {File} file
   * @returns {Promise<string>}
   */
  function compressImageToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDimension = 1280;
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target.result);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(compressedDataUrl);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Handle image file selection with client-side canvas optimization.
   */
  async function handleImageUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPEG, WebP).');
      elements.hazardImageInput.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB.');
      elements.hazardImageInput.value = '';
      return;
    }

    try {
      const compressedDataUrl = await compressImageToDataUrl(file);
      state.uploadedImageBase64 = compressedDataUrl;
      elements.imagePreview.src = compressedDataUrl;
      elements.imagePreviewWrapper.classList.remove('hidden');
      announceToScreenReader('Hazard photo attached and optimized successfully.');
    } catch (err) {
      alert('Failed to process image file.');
      elements.hazardImageInput.value = '';
    }
  }

  /**
   * Remove attached image.
   */
  function removeImage() {
    state.uploadedImageBase64 = null;
    elements.hazardImageInput.value = '';
    elements.imagePreview.src = '';
    elements.imagePreviewWrapper.classList.add('hidden');
    announceToScreenReader('Attached photo removed.');
  }

  /**
   * Construct and launch WhatsApp emergency dispatch URL.
   * @param {string} customMessage
   */
  function launchWhatsAppDispatch(customMessage) {
    const waUrl = `https://wa.me/${EMERGENCY_PHONE}?text=${encodeURIComponent(customMessage)}`;
    window.open(waUrl, '_blank');
  }

  /**
   * Handle Multimodal AI Hazard Form Submission.
   */
  async function handleHazardAnalysis(e) {
    e.preventDefault();

    const description = elements.hazardDescInput.value.trim();
    const imageBase64 = state.uploadedImageBase64;
    const language = state.selectedLanguage;

    if (!description && !imageBase64) {
      alert('Please provide an incident description or attach a photo of the hazard.');
      elements.hazardDescInput.focus();
      return;
    }

    // Set UI Loading State
    elements.analyzeSubmitBtn.disabled = true;
    elements.aiLoadingContainer.classList.remove('hidden');
    elements.aiResultContainer.classList.add('hidden');
    elements.aiResultContainer.textContent = '';
    announceToScreenReader('Analyzing hazard with Gemini AI. Please wait.');

    try {
      const payload = {
        description: description || undefined,
        image_base64: imageBase64 || undefined,
        language: language,
      };

      const response = await fetch('/api/analyze-hazard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();
      state.lastAiResult = {
        ...result,
        description: description,
      };
      renderAiResults(result, description);
    } catch (err) {
      renderAiError('Unable to complete AI hazard assessment at this time. Please follow standard emergency protocols or trigger Campus SOS.');
    } finally {
      elements.analyzeSubmitBtn.disabled = false;
      elements.aiLoadingContainer.classList.add('hidden');
    }
  }

  /**
   * Render AI Results safely into the DOM.
   * @param {{ severity_level: string, first_aid_steps: string[], translated_warning: string }} data
   * @param {string} incidentDescription
   */
  function renderAiResults(data, incidentDescription) {
    elements.aiResultContainer.textContent = '';
    elements.aiResultContainer.classList.remove('hidden');

    const resultCard = document.createElement('div');
    resultCard.className = 'protocol-card';

    // Header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'protocol-card-header';

    const titleEl = document.createElement('h3');
    titleEl.className = 'protocol-card-title';
    titleEl.textContent = '🤖 AI Hazard Triage Protocol';

    const severityPill = document.createElement('span');
    const severityLower = (data.severity_level || 'High').toLowerCase();
    severityPill.className = `severity-pill severity-${severityLower}`;
    severityPill.textContent = `Assessed Severity: ${data.severity_level}`;

    cardHeader.appendChild(titleEl);
    cardHeader.appendChild(severityPill);
    resultCard.appendChild(cardHeader);

    // Translated Warning Highlight Box
    if (data.translated_warning) {
      const warningBox = document.createElement('div');
      warningBox.className = 'ai-warning-highlight';
      const warningTitle = document.createElement('strong');
      warningTitle.textContent = `[${state.selectedLanguage}] Urgent Safety Warning: `;
      warningBox.appendChild(warningTitle);
      warningBox.appendChild(document.createTextNode(data.translated_warning));
      resultCard.appendChild(warningBox);
    }

    // First Aid Steps
    if (Array.isArray(data.first_aid_steps) && data.first_aid_steps.length > 0) {
      const stepsHeading = document.createElement('h4');
      stepsHeading.style.fontSize = '0.95rem';
      stepsHeading.style.fontWeight = '800';
      stepsHeading.textContent = 'Recommended First-Aid & Hazard Actions:';
      resultCard.appendChild(stepsHeading);

      const stepsList = document.createElement('ol');
      stepsList.className = 'protocol-steps-list';

      data.first_aid_steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        stepsList.appendChild(li);
      });
      resultCard.appendChild(stepsList);
    }

    // Emergency SOS WhatsApp Dispatch CTA inside Chat/Triage Output
    const sosCtaBox = document.createElement('div');
    sosCtaBox.className = 'ai-sos-cta-box';

    const ctaText = document.createElement('div');
    ctaText.className = 'ai-sos-cta-text';
    const ctaStrong = document.createElement('strong');
    ctaStrong.textContent = 'Need immediate on-site responder dispatch?';
    const ctaSub = document.createElement('span');
    ctaSub.textContent = 'Transmit this verified hazard triage report directly to Campus Security & EMS via WhatsApp (+91 8250666852).';
    ctaText.appendChild(ctaStrong);
    ctaText.appendChild(ctaSub);

    const waBtn = document.createElement('button');
    waBtn.type = 'button';
    waBtn.className = 'sos-whatsapp-btn';
    waBtn.innerHTML = '<span>🚨 DISPATCH TO WHATSAPP (+91 8250666852)</span>';
    
    waBtn.addEventListener('click', () => {
      const location = elements.sosLocationInput.value.trim() || 'Campus Zone';
      const waMsg = `🚨 EMERGENCY INCIDENT TRIAGE REPORT!
Location: ${location}
Severity: ${data.severity_level.toUpperCase()}
Incident: ${incidentDescription || 'Visual hazard upload'}
AI Warning: ${data.translated_warning || 'Emergency protocol active'}
Time: ${new Date().toLocaleTimeString()}
Immediate on-site emergency assistance requested.`;
      launchWhatsAppDispatch(waMsg);
    });

    sosCtaBox.appendChild(ctaText);
    sosCtaBox.appendChild(waBtn);
    resultCard.appendChild(sosCtaBox);

    elements.aiResultContainer.appendChild(resultCard);
    announceToScreenReader(`AI Analysis complete. Assessed severity level is ${data.severity_level}.`);
  }

  /**
   * Render AI Error.
   * @param {string} message
   */
  function renderAiError(message) {
    elements.aiResultContainer.textContent = '';
    elements.aiResultContainer.classList.remove('hidden');

    const errorBox = document.createElement('div');
    errorBox.className = 'protocol-warning-box';
    errorBox.style.borderColor = '#ef4444';
    errorBox.style.color = '#991b1b';
    errorBox.style.background = '#fef2f2';

    const strong = document.createElement('strong');
    strong.textContent = 'Analysis Notice: ';
    errorBox.appendChild(strong);
    errorBox.appendChild(document.createTextNode(message));

    elements.aiResultContainer.appendChild(errorBox);
    announceToScreenReader('Error occurred during hazard analysis.');
  }

  /**
   * Handle Campus SOS Alert Dispatch Trigger with WhatsApp Integration.
   */
  async function handleSosAlert() {
    const location = elements.sosLocationInput.value.trim() || 'Main Campus Complex - Zone A';
    const timestamp = new Date().toISOString();

    // 1. Direct WhatsApp Message Construction and Launch
    const waMessage = `🚨 CAMPUS EMERGENCY SOS ALERT!
Location: ${location}
Time: ${new Date().toLocaleTimeString()} (${new Date().toLocaleDateString()})
Status: IMMEDIATE DISPATCH REQUESTED
Contact Number: +91 8250666852 / 112
Please deploy campus security, EMS, and first responders to this location immediately.`;

    launchWhatsAppDispatch(waMessage);

    // 2. Server API Ticket Logging
    elements.sosTriggerBtn.disabled = true;
    elements.sosTriggerBtn.style.opacity = '0.7';

    try {
      const payload = {
        hazard_type: 'Campus Emergency SOS Trigger',
        location: location,
        timestamp: timestamp,
        contact_group: 'Campus Security & EMS (+91 8250666852)',
      };

      const response = await fetch('/api/sos-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`SOS endpoint error: ${response.status}`);
      }

      const result = await response.json();
      renderSosConfirmation(result, waMessage);
    } catch (e) {
      renderSosError('Server logging failed, but WhatsApp dispatch link was opened. In critical emergencies, please dial 112 directly.');
    } finally {
      elements.sosTriggerBtn.disabled = false;
      elements.sosTriggerBtn.style.opacity = '1';
    }
  }

  /**
   * Render SOS Dispatch Confirmation Card safely.
   * @param {{ status: string, alert_id: string, timestamp: string, location: string, contact_group: string }} result
   * @param {string} waMessage
   */
  function renderSosConfirmation(result, waMessage) {
    elements.sosResultContainer.textContent = '';
    elements.sosResultContainer.classList.remove('hidden');

    const badge = document.createElement('div');
    badge.className = 'sos-badge-dispatched';
    badge.textContent = `🚨 DISPATCH CONFIRMED — Ticket ID: ${result.alert_id}`;
    elements.sosResultContainer.appendChild(badge);

    const message = document.createElement('p');
    message.style.fontSize = '0.9rem';
    message.style.fontWeight = '700';
    message.style.color = '#7f1d1d';
    message.textContent = `Emergency dispatch transmitted to ${result.contact_group}. Responders are alerted to your location coordinates.`;
    elements.sosResultContainer.appendChild(message);

    const grid = document.createElement('div');
    grid.className = 'sos-details-grid';

    const locItem = document.createElement('div');
    locItem.innerHTML = `<strong>Location:</strong> `;
    locItem.appendChild(document.createTextNode(result.location));

    const timeItem = document.createElement('div');
    const localTime = new Date(result.timestamp).toLocaleTimeString();
    timeItem.innerHTML = `<strong>Server Time:</strong> `;
    timeItem.appendChild(document.createTextNode(localTime));

    const statusItem = document.createElement('div');
    statusItem.innerHTML = `<strong>Status:</strong> `;
    statusItem.appendChild(document.createTextNode(result.status.toUpperCase()));

    grid.appendChild(locItem);
    grid.appendChild(timeItem);
    grid.appendChild(statusItem);
    elements.sosResultContainer.appendChild(grid);

    // Add Direct WhatsApp Re-open Link
    const waRow = document.createElement('div');
    waRow.className = 'sos-wa-action-row';
    const waLink = document.createElement('a');
    waLink.className = 'sos-whatsapp-btn';
    waLink.href = `https://wa.me/${EMERGENCY_PHONE}?text=${encodeURIComponent(waMessage)}`;
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
    waLink.innerHTML = '<span>📱 Open WhatsApp Emergency Chat (+91 8250666852)</span>';
    waRow.appendChild(waLink);
    elements.sosResultContainer.appendChild(waRow);

    announceToScreenReader(`Emergency SOS Alert confirmed. Ticket reference ID ${result.alert_id}. WhatsApp dispatch opened.`);
  }

  /**
   * Render SOS Error.
   * @param {string} msg
   */
  function renderSosError(msg) {
    elements.sosResultContainer.textContent = '';
    elements.sosResultContainer.classList.remove('hidden');

    const errorEl = document.createElement('p');
    errorEl.style.color = '#b91c1c';
    errorEl.style.fontWeight = '700';
    errorEl.textContent = `Alert Notice: ${msg}`;
    elements.sosResultContainer.appendChild(errorEl);
    announceToScreenReader(msg);
  }

  /**
   * Setup Event Listeners.
   */
  function setupEventListeners() {
    // Language Switcher - Triggers full-page UI translation
    if (elements.languageSelect) {
      elements.languageSelect.addEventListener('change', (e) => {
        state.selectedLanguage = e.target.value;
        applyUiTranslations(state.selectedLanguage);
        announceToScreenReader(`Language changed to ${state.selectedLanguage}.`);
        if (state.activeProtocolId) {
          renderProtocol(state.activeProtocolId);
        }
      });
    }

    // Quick Help Protocol Buttons
    if (elements.quickHelpGrid) {
      elements.quickHelpGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.protocol-btn');
        if (!btn) return;
        const protocolId = btn.getAttribute('data-protocol-id');
        if (protocolId) {
          renderProtocol(protocolId);
        }
      });
    }

    // Quick Location Chips
    document.querySelectorAll('.location-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const loc = chip.getAttribute('data-loc');
        if (loc && elements.sosLocationInput) {
          elements.sosLocationInput.value = loc;
          elements.sosLocationInput.focus();
        }
      });
    });

    // Quick Hazard Scenario Chips
    document.querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        if (prompt && elements.hazardDescInput) {
          elements.hazardDescInput.value = prompt;
          elements.hazardDescInput.focus();
        }
      });
    });

    // Hazard Photo Input with auto canvas compression
    if (elements.hazardImageInput) {
      elements.hazardImageInput.addEventListener('change', handleImageUpload);
    }

    // Remove Photo Button
    if (elements.removeImageBtn) {
      elements.removeImageBtn.addEventListener('click', removeImage);
    }

    // AI Form Submission
    if (elements.hazardForm) {
      elements.hazardForm.addEventListener('submit', handleHazardAnalysis);
    }

    // SOS Alert Button
    if (elements.sosTriggerBtn) {
      elements.sosTriggerBtn.addEventListener('click', handleSosAlert);
    }
  }

  /**
   * Initialize Application.
   */
  async function init() {
    setupEventListeners();
    await loadProtocols();
    applyUiTranslations(state.selectedLanguage);
    initDecorativeWebGL();
    initGsapAnimations();
  }

  // Trigger init on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
