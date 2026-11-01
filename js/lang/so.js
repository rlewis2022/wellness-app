/*
 * Somali (Af-Soomaali) text and content for the Wellness App.
 *
 * DRAFT: this translation has not yet been reviewed by a native Somali speaker.
 * Have it checked before showing it to patients.
 *
 * Content is adapted, not just translated: Somali names in the contact list,
 * the Somali seasons (Jiilaal, Gu', Xagaa, Dayr), a week that starts on Saturday,
 * and counting words instead of alphabetical order.
 */
window.WELLNESS_LANG = {
  code: 'so',

  ui: {
    chooseLevel: 'Dooro heerkaaga',
    easyName: 'Fudud',
    easyDesc: 'Bartilmaameedyo waaweyn, tallaabooyin yar',
    mediumName: 'Dhexdhexaad',
    mediumDesc: 'Wax yar oo dheeraad ah',
    hardName: 'Adag',
    hardDesc: 'Bartilmaameedyo yaryar, tallaabooyin badan',
    start: 'Bilow tababarka maanta',
    startHint: 'Saddex hawlood oo gaagaaban oo si kedis ah loo doortay. Qaado inta waqti ee aad u baahan tahay.',
    privacyNote: 'Waxa aad halkan ku samayso lama kaydiyo, meelna looma diro. Markaad boggan xirto, wax walba dib ayay u bilaabmayaan.',
    wellnessNote: 'Waxaa loogu talagalay caafimaadka guud oo keliya. Looma isticmaalo in lagu ogaado, lagu daaweeyo ama looga hortago xaalad caafimaad.',
    endShort: 'Jooji',
    confirmTitle: 'Ma joojinaysaa tababarkan?',
    confirmText: 'Waxaad bilaabi kartaa tababar cusub wakhti kasta.',
    keepGoing: 'Sii wad',
    confirmEnd: 'Jooji tababarka',
    finishTitle: 'Hambalyo!',
    finishText: 'Waad dhammaysay saddexda hawlood ee maanta. Berri soo noqo si aad u hesho hawlo cusub.',
    again: 'Samee tababar kale',
    home: 'Ku noqo bilowga',
    step: (i, n) => `${i} / ${n}`,
    stepLabel: (i, n) => `Hawsha ${i} / ${n}`,
    nextActivity: 'Hawsha xigta',
    finish: 'Dhammee',
    wellDone: 'Hambalyo!',
    groups: { hand: 'Xakamaynta gacanta', thinking: 'Xujo fikir', phone: 'Xirfadaha taleefanka' },
    question: (r, n) => `Su'aasha ${r} / ${n}`,
    progress: (r, n) => `${r} / ${n}`,
  },

  dots: {
    title: 'Isku xir dhibcaha',
    instruction: (level) => (level === 'easy'
      ? 'Taabo dhibcaha sida lambarradoodu isugu xigaan, adiga oo ka bilaabaya 1. Dhibicda xigta waxaa ku wareegsan goobaabin.'
      : 'Taabo dhibcaha sida lambarradoodu isugu xigaan, adiga oo ka bilaabaya 1.'),
    aria: 'Dhibco lambarro leh',
    wrong: (hit, next) => `Kani waa ${hit}. Raadi ${next}.`,
    done: (name) => `Waxaad sawirtay ${name}!`,
    names: {
      house: 'guri', kite: 'qaab dheeman', flag: 'calan', fish: 'kalluun', sailboat: 'doon',
      arrow: 'fallaar', star: 'xiddig', tree: 'geed', heart: 'qalbi',
    },
  },

  maze: {
    title: 'Hel jidka',
    instruction: 'Ka bilow goobaabinta cagaaran. Farta ku jiid jidadka furan ilaa sanduuqa yar ee geeska kale. Xariiqyadu waa derbiyo aanad dhex mari karin.',
    start: 'Ka bilow goobaabinta cagaaran.',
    keepGoing: 'Ka sii wad dhammaadka xariiqdaada. Waxaa ku wareegsan goobaabin.',
    wall: 'Taasi waa derbi. Raadi jid furan.',
    done: 'Waad heshay jidka!',
  },

  copy: {
    title: 'Ku celi sawirka',
    instruction: 'Eeg sawirka yar. Wax la mid ah ku sawir sanduuqa weyn. Uma baahna inuu noqdo mid dhammaystiran.',
    label: (name) => `Sawir ${name}`,
    aria: (name) => `Sawirka ${name}`,
    clear: 'Tirtir',
    doneButton: 'Waan dhammeeyay',
    hint: 'Taabo "Waan dhammeeyay" markaad ku qanacdo.',
    done: 'Sawir wanaagsan!',
    names: {
      square: 'afargeesle', triangle: 'saddexagal', plus: 'calaamadda lagu daro (+)',
      house: 'guri', envelope: 'baqshad', arrow: 'fallaar',
      houseDetail: 'guri leh albaab iyo daaqad', star: 'xiddig', twoSquares: 'laba afargeesle oo isku dul saaran',
    },
  },

  odd: {
    title: 'Midka ka duwan',
    instruction: 'Taabo erayga aan la mid ahayn kuwa kale.',
    right: (why) => `Haa! ${why}`,
    wrong: 'Maya. Kee baa ka duwan kuwa kale?',
    done: 'Waad heshay dhammaan kuwa ka duwan!',
    sets: {
      easy: [
        { items: ['Moos', 'Liin', 'Kursi'], odd: 'Kursi', why: 'Moos iyo liin waa miro.' },
        { items: ['Geel', 'Ari', 'Qaaddo'], odd: 'Qaaddo', why: 'Geel iyo ari waa xoolo.' },
        { items: ['Cas', 'Buluug', 'Miis'], odd: 'Miis', why: 'Cas iyo buluug waa midabyo.' },
        { items: ['Shaar', 'Sharabaad', 'Karooto'], odd: 'Karooto', why: 'Shaar iyo sharabaad waa dhar.' },
        { items: ['Bas', 'Tareen', 'Barkin'], odd: 'Barkin', why: 'Bas iyo tareen waa gaadiid.' },
        { items: ['Bariis', 'Baasto', 'Kabo'], odd: 'Kabo', why: 'Bariis iyo baasto waa cunto.' },
      ],
      medium: [
        { items: ['Isniin', 'Jimce', 'Axad', 'Abriil'], odd: 'Abriil', why: 'Abriil waa bil. Kuwa kale waa maalmo toddobaadka ka mid ah.' },
        { items: ['Libaax', 'Shabeel', 'Dhurwaa', 'Kalluun'], odd: 'Kalluun', why: 'Libaax, shabeel iyo dhurwaa waxay ku nool yihiin dhulka. Kalluunku biyaha ayuu ku nool yahay.' },
        { items: ['Shaah', 'Caano', 'Bun', 'Rooti'], odd: 'Rooti', why: 'Shaah, caano iyo bun waa wax la cabbo. Rootiga waa la cunaa.' },
        { items: ['Fargeeto', 'Mindi', 'Qaaddo', 'Majarafad'], odd: 'Majarafad', why: 'Fargeeto, mindi iyo qaaddo waxaa loo isticmaalaa cunista.' },
        { items: ["Gu'", 'Jiilaal', 'Dayr', 'Talaado'], odd: 'Talaado', why: "Gu', jiilaal iyo dayr waa xilliyada sanadka. Talaado waa maalin." },
        { items: ['Gaari', 'Diyaarad', 'Doon', 'Tufaax'], odd: 'Tufaax', why: 'Gaari, diyaarad iyo doon waa gaadiid.' },
      ],
      hard: [
        { items: ['2', '4', '8', '9'], odd: '9', why: '2, 4 iyo 8 waa tirooyin dhaban ah. 9 waa tiro kisi ah.' },
        { items: ['Shan', 'Toddoba', 'Sagaal', 'Lix'], odd: 'Lix', why: 'Shan, toddoba iyo sagaal waa tirooyin kisi ah. Lix waa dhaban.' },
        { items: ['Dahab', 'Naxaas', 'Bir', 'Alwaax'], odd: 'Alwaax', why: 'Dahab, naxaas iyo bir waa macdan. Alwaaxdu waa qori.' },
        { items: ['Geel', "Lo'", 'Ari', 'Digaag'], odd: 'Digaag', why: "Geel, lo' iyo ari waa xoolo afar lugood leh. Digaaggu waa shimbir." },
        { items: ['Muqdisho', 'Kismaayo', 'Baydhabo', 'Nairobi'], odd: 'Nairobi', why: 'Nairobi waxay ku taal Kenya. Kuwa kale waa magaalooyin Soomaaliya ku yaal.' },
        { items: ['Dameer', 'Faras', 'Baqal', 'Bisad'], odd: 'Bisad', why: 'Dameer, faras iyo baqal waa la fuulaa. Bisadda lama fuulo.' },
      ],
    },
  },

  order: {
    title: 'Kala horreysii',
    instruction: "Akhri su'aasha, kadibna taabo jawaabaha sida saxda ah ee ay isugu xigaan. Mid kasta oo aad saxdo waa la lambareynayaa.",
    right: 'Taasi waa habka saxda ah!',
    wrongFirst: 'Weli maaha kaas. Kee baa ugu horreeya?',
    wrongNext: 'Weli maaha kaas. Kee baa xiga?',
    done: 'Wax walba waad kala horreysiisay!',
    rounds: {
      easy: [
        { type: 'numbers', count: 3, max: 20, prompt: 'Taabo tirooyinka, laga bilaabo ta ugu yar ilaa ta ugu weyn.' },
        { type: 'fixed', prompt: 'Taabo cuntooyinka sida aad maalintii u cunto.', items: ['Quraac', 'Qado', 'Casho'] },
        { type: 'fixed', prompt: 'Taabo cabbirrada, laga bilaabo kan ugu yar.', items: ['Yar', 'Dhexdhexaad', 'Weyn'] },
        { type: 'fixed', prompt: 'Taabo waqtiyada maalinta sida ay u dhacaan.', items: ['Subax', 'Galab', 'Habeen'] },
      ],
      medium: [
        { type: 'numbers', count: 4, max: 50, prompt: 'Taabo tirooyinka, laga bilaabo ta ugu yar ilaa ta ugu weyn.' },
        { type: 'slice', count: 4, prompt: 'Taabo maalmaha sida ay toddobaadka isugu xigaan.', list: ['Sabti', 'Axad', 'Isniin', 'Talaado', 'Arbaco', 'Khamiis', 'Jimce'] },
        { type: 'fixed', prompt: 'Taabo xilliyada sanadka, adiga oo ka bilaabaya Jiilaal.', items: ['Jiilaal', "Gu'", 'Xagaa', 'Dayr'] },
        { type: 'fixed', prompt: 'Taabo tallaabooyinka sida ay u dhacaan.', items: ['Abuur iniinta', 'Waraabi', 'Way soo baxdaa', 'Way ubax bixisaa'] },
      ],
      hard: [
        { type: 'numbers', count: 5, max: 100, prompt: 'Taabo tirooyinka, laga bilaabo ta ugu yar ilaa ta ugu weyn.' },
        { type: 'slice', count: 5, prompt: 'Taabo bilaha sida ay sanadka isugu xigaan.', list: ['Janaayo', 'Febraayo', 'Maarso', 'Abriil', 'Maajo', 'Juun', 'Luulyo', 'Ogosto', 'Sebtembar', 'Oktoobar', 'Nofembar', 'Desembar'] },
        { type: 'fixed', prompt: 'Taabo tirooyinka sida ay isugu xigaan, adiga oo ka bilaabaya kow.', items: ['Kow', 'Laba', 'Saddex', 'Afar', 'Shan'] },
        { type: 'fixed', prompt: "Taabo da'da nolosha sida ay isugu xigaan.", items: ['Ilmo yar', 'Cunug', 'Dhallinyaro', 'Qof weyn', 'Waayeel'] },
      ],
    },
  },

  typing: {
    title: 'Qoraal',
    instruction: 'Taabo sanduuqa cad si kiiboodhku u furmo. Qor waxa aad aragto, kadibna taabo Hubi.',
    label: 'Halkan ku qor',
    check: 'Hubi',
    empty: 'Marka hore qor erayga, kadibna taabo Hubi.',
    right: 'Waa sax!',
    wrong: 'Ku dhowaad. Xaraf xaraf ula barbardhig waxa kor ku qoran, kadibna isku day mar kale.',
    done: 'Dhammaan waad qortay!',
    words: {
      easy: ['bad', 'dab', 'ari', 'lax', 'bun', 'cad', 'geel', 'biyo'],
      medium: ['hooyo', 'aabbe', 'shaah', 'caano', 'bariis', 'guriga', 'magaalo', 'subax'],
      hard: ['subax wanaagsan', 'mahadsanid', 'nabad gelyo', 'galab wanaagsan', 'ii soo wac', 'maalin wanaagsan'],
    },
  },

  scroll: {
    title: 'Rog oo raadi',
    instruction: 'Farta kor iyo hoos ugu jiid liiska si aad u rogto. Raadi magaca ku qoran xagga sare, kadibna taabo.',
    find: 'Raadi: ',
    listLabel: 'Liiska xiriirada',
    wrong: (name, target) => `Kani waa ${name}. Sii raadi ${target}.`,
    right: 'Waad heshay!',
    done: 'Waad heshay magac kasta!',
    names: [
      'Cali', 'Axmed', 'Maxamed', 'Cabdi', 'Xasan', 'Xuseen', 'Yuusuf', 'Ibraahim', 'Ismaaciil', 'Cumar',
      'Faarax', 'Jaamac', 'Warsame', 'Nuur', 'Aadan', 'Muuse', 'Ciise', 'Daahir', 'Shire', 'Bashiir',
      'Saciid', 'Abshir', 'Guuleed', 'Khaliif', 'Mahad', 'Liibaan', 'Cabdullaahi', 'Siyaad', 'Barre', 'Jibriil',
      'Faadumo', 'Caasha', 'Khadiija', 'Maryan', 'Xaawo', 'Hodan', 'Sahra', 'Ayaan', 'Hibo', 'Nimco',
      'Ubax', 'Ladan', 'Deeqa', 'Sagal', 'Idil', 'Filsan', 'Hamdi', 'Asli', 'Muna', 'Ruun',
      'Shukri', 'Sucaad', 'Samsam', 'Nasra', 'Ifraax', 'Samiira', 'Raxma', 'Yasmiin', 'Cawo', 'Sacdiya',
    ],
    initials: 'ABCDFGHIJKLMNQRSWXY'.split(''),
  },

  slider: {
    title: 'Jiid badhanka',
    instruction: 'Riix badhanka wareegsan oo u jiid calaamadda lambarka leh, sida marka aad codka kor ama hoos u qaaddo. Kadibna farta ka qaad.',
    aria: 'Badhan la jiido',
    goal: 'Badhanka geey ',
    now: (v) => `Badhanku wuxuu joogaa ${v}`,
    right: 'Si sax ah ayaad u dhigtay!',
    more: 'Waad u dhowdahay. Wax yar midig u jiid.',
    less: 'Waad u dhowdahay. Wax yar bidix u jiid.',
    done: 'Waad baratay inaad badhanka jiiddo!',
  },

  swipe: {
    title: 'Farta ku mari',
    instruction: 'Farta saar kaarka oo u jiid dhinaca falaartu tilmaamayso, sida marka aad sawirrada dhex marayso.',
    dir: { left: 'bidix', right: 'midig', up: 'kor', down: 'hoos' },
    word: { left: 'Bidix', right: 'Midig', up: 'Kor', down: 'Hoos' },
    text: (d) => ({
      left: 'Kaarka u jiid dhinaca bidix.',
      right: 'Kaarka u jiid dhinaca midig.',
      up: 'Kaarka kor u jiid.',
      down: 'Kaarka hoos u jiid.',
    })[d],
    card: (i, n, text) => `Kaarka ${i} / ${n}: ${text}`,
    wrongDir: (got, wantText) => `Kaarku wuxuu u dhaqaaqay ${got}. ${wantText}`,
    tooShort: 'Wax yar ka sii fogee intaadan farta ka qaadin.',
    done: 'Waad baratay inaad farta ku mariso!',
  },

  zoom: {
    title: 'Weynee sawirka',
    instruction: (level) => (level === 'easy'
      ? 'Sawirka ka raadi calaamad yar. Labo farood ku kala fidi sawirka si aad u weyneyso, akhri lambarka, kadibna hoose ka taabo. Badhamada "Weynee" iyo "Yaree" sidoo kale way shaqeeyaan.'
      : 'Meel sawirka ka mid ah waxaa ku taal calaamad yar oo lambar leh. Labo farood ku kala fidi si aad u weyneyso, akhri, kadibna hoose ka taabo. Hal far ku jiid si aad hareeraha u eegto. Badhamada "Weynee" iyo "Yaree" sidoo kale way shaqeeyaan.'),
    aria: 'Sawir guri, geed iyo calaamad yar',
    zoomIn: 'Weynee',
    zoomOut: 'Yaree',
    reset: 'Dib u celi',
    ask: 'Lambarkee ku qoran calaamadda?',
    wrong: 'Maya. U sii weynee si aad calaamadda u akhrido.',
    done: (n) => `Haa, calaamaddu waxay leedahay ${n}!`,
  },
};
