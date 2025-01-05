const fs = require("fs");

function generateRandomQuestion(index) {
    const questions = [
        "ما هي أكبر جزيرة في العالم؟",
        "ما هي عاصمة مصر؟",
        "من هو مؤلف رواية 'البؤساء'؟",
        "كم عدد الكواكب في المجموعة الشمسية؟",
        "ما هي اللغة الرسمية في البرازيل؟",
        "ما هو الحيوان الأسرع في العالم؟",
        "كم عدد ألوان قوس قزح؟",
        "ما هي أول جامعة في العالم؟",
        "من اكتشف قانون الجاذبية؟",
        "ما هو أكبر محيط في العالم؟"
    ];

    const options = [
        ["قبرص", "غرينلاند", "فيلكا", "طروادة"],
        ["الإسكندرية", "السويس", "القاهرة", "المنصورة"],
        ["فيكتور هوغو", "تشارلز ديكنز", "تولستوي", "فرانس كافكا"],
        ["7", "8", "9", "10"],
        ["الإسبانية", "البرتغالية", "الفرنسية", "الإنجليزية"],
        ["الفهد", "الأسد", "الغزال", "الفيل"],
        ["5", "6", "7", "8"],
        ["الأزهر", "السوربون", "أوكسفورد", "جامعة القرويين"],
        ["إسحاق نيوتن", "ألبرت أينشتاين", "جاليليو جاليلي", "نيكولا تيسلا"],
        ["الأطلسي", "الهادي", "الهندي", "القطبي"]
    ];

    const questionIndex = index % questions.length;

    return {
        question: questions[questionIndex],
        options: options[questionIndex],
        correct: Math.floor(Math.random() * 4) // Randomly choose the correct option
    };
}

function generateQuestions(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        questions.push(generateRandomQuestion(i));
    }
    return questions;
}

const questionData = generateQuestions(1000);

fs.writeFile("questions.json", JSON.stringify(questionData, null, 2), (err) => {
    if (err) {
        console.error("Error writing to file:", err);
    } else {
        console.log("questions.json has been generated with 1000 questions!");
    }
});
