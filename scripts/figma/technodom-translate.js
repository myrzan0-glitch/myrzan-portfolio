// Technodom case study: translate the 16 sorted screens to English.
//
// Run in Figma desktop with the Scripter plugin (it runs on your computer, so it can use your
// local Museo Sans Cyrl font): open the "Archive" page of Workshop-Myrzan, open Scripter,
// paste this whole file, press Run. It is safe to run twice: already-English text is skipped.
//
// It only changes text inside the section "Technodom — case study (EN)" and never touches the
// original technodom section. Two-colour text keeps its colours; numbers get English commas.

const DRY = false // true only checks coverage and changes nothing
const SECTION_ID = "132:14865"
const SECTION_NAME = "Technodom — case study (EN)"

// Per-node overrides: the "failed" state (built from the wrong-code screen).
const BY_ID = {
  "132:15205": "Something went wrong",
  "I137:16005;4:191": "Try again"
}

// Text with two colours: each part takes the style of the matching original segment.
const PARTS = {
  "Настоящим я подтверждаю, что ознакомлен и согласен с условиями политики конфиденциальности": [
    "I confirm that I have read and agree to the ",
    "privacy policy"
  ],
  "Подверждая номер телефона кодом из SMS, вы соглашаетесь со сбором и обработкой ваших персональных данных, предоставлением информации и получением отчета из кредитного бюро и вы ознакомлены и согласны с полным текстом согласий": [
    "By confirming your phone number with the SMS code, you agree to the collection and processing of your personal data and to a credit bureau check, and confirm that you have read and agree to ",
    "the full text of the consents"
  ],
  "Магазины и пунты выдачи Все": ["Stores and pickup points ", "All"],
  "Halyk Bank может выдать кредит только на 30 000 тг.": ["Halyk Bank can only lend you ", "30,000 ₸"]
}

const T = {
  "Оформление заказа": "Checkout",
  "Регистрация": "Checkout",
  "Вход в кабинет": "Checkout",
  "Рассрочка / кредит": "Credit or instalments",
  "Кредит": "Credit",
  "Рассрочка": "Instalments",
  "На какой срок": "For how long",
  "3 мес": "3 mo",
  "6 мес": "6 mo",
  "9 мес": "9 mo",
  "12 мес": "12 mo",
  "24 мес": "24 mo",
  "36 мес": "36 mo",
  "Банк": "Bank",
  "Выбор лучшего предложения от банков": "The best offer from every bank",
  "Мы покажем все кредитные преложения от банков — вы выбираете лучшее": "We’ll show you every bank’s offer, you choose the best",
  "тг.": "₸",
  "Сергей": "Sergey",
  "Калмаков": "Kalmakov",
  "Имя": "First name",
  "Фамилия": "Last name",
  "ИИН": "ID number (IIN)",
  "Продолжить": "Continue",
  "Подтвердите номер телефона": "Confirm your phone number",
  "На номер +7 778 123 45 67 был отправлен SMS-код для подтверждения": "We sent a confirmation code to +7 778 123 45 67",
  "На номер +7 778 674 83 91 был отправлен SMS-код для подтверждения": "We sent a confirmation code to +7 778 674 83 91",
  "Отправить SMS-код повторно": "Resend code",
  "Для отправки заявки, вам необходимо придумать пароль": "Create a password to send your application",
  "Номер мобильного телефона": "Mobile number",
  "Пароль": "Password",
  "Повторите пароль": "Repeat password",
  "Все кредитные преложения": "All credit offers",
  "На номер +7 778 123 45 67 было отправлено SMS с кодом": "We sent a code to +7 778 123 45 67",
  "Код из SMS": "SMS code",
  "выслать SMS повторно": "Resend code",
  "выслать SMS повторно через 59 сек.": "Resend code in 59 s",
  "Согласие": "Consent",
  "БВУ и МФО:": "Banks and MFOs:",
  "Банк Хоум Кредит": "Home Credit Bank",
  "Халык Банк": "Halyk Bank",
  "Выберите подходящее предложение": "Choose the offer that suits you",
  "Кредит / рассрочка": "Credit / instalments",
  "Кредиты": "Credit",
  "Кредиты / рассрочки": "Credit / instalments",
  "на 3 месяца": "3 months",
  "на 24 месяца": "24 months",
  "Одобрено": "Approved",
  "Расчет": "Calculating",
  "Отказано": "Refused",
  "Срок кредитования": "Loan term",
  "3 месяца": "3 months",
  "6 месяцев": "6 months",
  "9 месяцев": "9 months",
  "12 месяцев": "12 months",
  "24 месяца": "24 months",
  "36 месяцев": "36 months",
  "Показать 6 предложений": "Show 6 offers",
  "Показать 2 предложения": "Show 2 offers",
  "Ограничение по кредитованию": "Credit limit",
  "Сумма покупки": "Purchase amount",
  "Срок рассрочки": "Instalment term",
  "Попробуйте в других банках": "Try other banks",
  "Вернуться в корзину": "Back to cart",
  "Отказано банком": "Refused by the bank",
  "Halyk Bank отказал вам в выдачи кредита": "Halyk Bank refused your credit application",
  "На данный момент мы не можем рассмотреть заявку, так как у Вас есть непогашенная просроченная задолженность. Погасите ее и заново подайте заявку на получение займа":
    "We can’t review your application right now because you have an overdue debt. Pay it off and apply again.",
  "Вам отказано в получении займа, возраст заемщика должен составлять не менее 18 лет и не более 63 лет.":
    "Your application was refused: borrowers must be between 18 and 63 years old.",
  "Подайте заявку занова и укажите сумму займа меньше.": "Apply again with a smaller loan amount.",
  "Код введён неверно": "Wrong code",
  "Я, настоящим подтверждаю свое безусловное и безоговорочное согласие (далее – «Согласие») в пользу АО «Technodom Operator» (Технодом Оператор) (далее по тексту – «Компания»), а также в пользу лиц, прямо или косвенно связанным в настоящее время и в будущем с Компанией любыми правоотношениями и обстоятельствами включая, но не ограничиваясь следующими БВУ и МФО (Третьи Лица): АО “Народный сберегательный банк Казахстана”, АО “Bank RBK”, ДБ АО “Банк Хоум Кредит”, ТОО «S1LK», АО “ALTYN BANK” (ДБ CHINA CITIC BANK CORPORATION LTD), Микрофинансовая организация ФРИДОМ ФИНАНС Кредит":
    "I hereby give my unconditional and irrevocable consent (the “Consent”) to Technodom Operator JSC (the “Company”) and to anyone connected with the Company, now or in the future, by any legal relationship, including but not limited to these banks and microfinance organisations (the “Third Parties”): Halyk Bank of Kazakhstan JSC, Bank RBK JSC, Home Credit Bank SB JSC, S1LK LLP, ALTYN BANK JSC (SB of China CITIC Bank Corporation Ltd) and Freedom Finance Credit microfinance organisation",
  "На Сбор, хранение, обработку, передачу, в том числе на трансграничную передачу, моих персональных данных зафиксированных на электронных, бумажных, и (или) иных носителях, имеющихся в любых источниках, в том числе общедоступных, которые были, будут или могут быть известны Компании и/или Третьим Лицам или получены ими от меня и/или любыми способами, не противоречащими законодательству Республики Казахстан, в процессе осуществления их деятельности и/или при использовании любых источников, в том числе общедоступных, включая, но не ограничиваясь всеми и любыми сведениями добровольно внесенными мной при регистрации на сайте www.technodom.kz и/или в мобильном приложении «Technodom», и/или при оформлении заказа и/или услуги по номерам телефонов, указанных на сайте и/или ставшие известными из любых иных доступных источников в целях, связанных с возникновением с Компанией и/или Третьими Лицами в прошлом, в настоящее время и в будущем договорных и иных любых правоотношений между мною и Компанией и/или Третьими Лицами включая, но не ограничиваясь проведения оценки платежеспособности для целей обработки моей заявки на выдачу займа и в случае неисполнения и/или ненадлежащего исполнения мною обязательств по нему, а также в иных целях, прямо или косвенно связанных с деятельностью Компании и/или Третьих Лиц.":
    "to the collection, storage, processing and transfer, including cross-border transfer, of my personal data held on electronic, paper or other media in any source, including public ones, that the Company and/or the Third Parties have, will have or may obtain from me by any lawful means, including everything I provide when registering on www.technodom.kz or in the Technodom app, or when ordering by phone, for purposes connected with any contractual or other relationship between me and the Company and/or the Third Parties, including assessing my creditworthiness to process my loan application and acting if I fail to meet my obligations under it.",
  "А также, я настоящим подтверждаю, что Согласие действует без ограничения срока. При этом настоящее Согласие может быть отозвано мною с предварительным письменным уведомлением об этом Компании на адрес электронной почты callcenter@technodom.kz не менее чем за 30 (тридцать) дней до вступления отзыва в силу, исчисляемых с даты получения Компанией соответствующего уведомления об отзыве Согласия. Согласие не может быть отозвано в случаях, если это противоречит Законодательству, а также при наличии неисполненных мною обязательств перед Компанией и/или Третьими Лицами.":
    "I also confirm that this Consent is valid indefinitely. I may withdraw it by writing to the Company at callcenter@technodom.kz at least 30 (thirty) days before the withdrawal takes effect. The Consent cannot be withdrawn where that would contradict the law, or while I have outstanding obligations to the Company and/or the Third Parties.",
  "Текст настоящего Согласия составлен в соответствии с требованиями законодательства, а именно:":
    "This Consent is drawn up in accordance with the law, namely:",
  "1. Законом Республики Казахстан от 21 мая 2013 года «О персональных данных и их защите»":
    "1. the Law of the Republic of Kazakhstan of 21 May 2013 “On Personal Data and Their Protection”;",
  "2. и иными нормативными правовыми актами, действующими на территории Республики Казахстан в отношении персональных данных.":
    "2. other regulations of the Republic of Kazakhstan on personal data.",
  "Текст настоящего Согласия прочитан мной лично, дополнений и возражений не имеет.":
    "I have read this Consent myself and have no additions or objections."
}

// The long consent is one text node with paragraphs; it is translated paragraph by paragraph.
const PARAGRAPHED = "Я, настоящим подтверждаю свое безусловное"

const log = typeof print === "function" ? print : (...a) => console.log(...a)
const getNode = async (id) => (figma.getNodeByIdAsync ? figma.getNodeByIdAsync(id) : figma.getNodeById(id))
const CYR = /[А-Яа-яЁёҚқҢңӘәІіҮүҰұӨөҺһҒғ]/
const ODD = new RegExp("[" + String.fromCharCode(160, 8232, 8233, 13) + "]", "g")
const norm = (s) => s.replace(ODD, (c) => (c === "\r" ? "" : " ")).split("\n").map((l) => l.replace(/ {2,}/g, " ").trim()).join("\n").trim()
const TN = {}
for (const k in T) TN[norm(k)] = T[k]
const PN = {}
for (const k in PARTS) PN[norm(k)] = PARTS[k]
const loaded = new Set()
const load = async (f) => {
  const k = f.family + "|" + f.style
  if (!loaded.has(k)) {
    await figma.loadFontAsync(f)
    loaded.add(k)
  }
}

function translateParagraphs(str) {
  const paras = str.replace(/\r/g, "").split("\n")
  const out = []
  for (const p of paras) {
    const n = norm(p)
    if (!n) { out.push(""); continue }
    const en = TN[n]
    if (en === undefined) return null
    out.push(en)
  }
  return out.join("\n")
}

let sec = await getNode(SECTION_ID)
if (!sec) sec = figma.currentPage.findOne((n) => n.type === "SECTION" && n.name === SECTION_NAME)
if (!sec) throw new Error("Section not found. Open the Archive page and run again.")

const report = { translated: 0, numbers: 0, missing: {}, mixedMismatch: [], errors: [] }
for (const frame of sec.children.filter((c) => c.type === "FRAME")) {
  for (const t of frame.findAll((n) => n.type === "TEXT")) {
    const str = t.characters
    let en = BY_ID[t.id]
    let parts = null
    if (en === undefined && /^\s*\d{1,3}(?:[  ]\d{3})+\s*$/.test(str)) {
      en = str.trim().replace(/[  ]/g, ",")
      report.numbers++
    }
    if (en === undefined) {
      if (!CYR.test(str)) continue
      const n = norm(str)
      parts = PN[n] || null
      en = parts ? parts.join("") : TN[n]
      if (en === undefined && n.startsWith(PARAGRAPHED)) en = translateParagraphs(str) ?? undefined
    }
    if (en === undefined) {
      report.missing[frame.name + ": " + str.slice(0, 70)] = true
      continue
    }
    const segs = t.getStyledTextSegments(["fontName", "fills"])
    if (parts && parts.length !== segs.length) report.mixedMismatch.push(frame.name + ": " + str.slice(0, 40) + ` (${segs.length} styles, ${parts.length} parts)`)
    if (DRY) { report.translated++; continue }
    try {
      for (const s of segs) await load(s.fontName)
      t.characters = en
      if (parts && parts.length === segs.length) {
        let at = 0
        parts.forEach((p, i) => {
          if (!p.length) return
          t.setRangeFontName(at, at + p.length, segs[i].fontName)
          t.setRangeFills(at, at + p.length, segs[i].fills)
          at += p.length
        })
      }
      report.translated++
    } catch (e) {
      report.errors.push(frame.name + ": " + str.slice(0, 40) + " → " + String(e).slice(0, 120))
    }
  }
}
report.missing = Object.keys(report.missing)
log(JSON.stringify(report, null, 2))
if (!DRY) log(report.missing.length || report.errors.length ? "Done, with items to check (see above)." : "Done: every screen is in English.")
