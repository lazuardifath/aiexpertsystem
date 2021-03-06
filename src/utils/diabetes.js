const { Rule, Rools } = require('rools')
const symptoms = require('./diabetes_symptoms')

let facts = ''
const getvalues = (p, fpg, gthae, gds, s1, s2, s3, s4) => {
    const getvalues = symptoms.setSymptoms(p, fpg, gthae, gds, s1, s2, s3, s4, (res) => {
        return res
    });
    facts = getvalues
    return facts
}

// getvalues(false, 300, 400, true, false, false, false, false, false, false, false, false, false)


//get the values
// let facts = 
// symptoms.setSymptoms(false, 300, 400, true, false, false, false, false, false, false, false, false, false, (res) => {
//     return res
// });



//Symptoms
//if you have two trues, it can be you have diabetes
var symptom_risk_fact = ''
let isTrue = ''
const symptom_risk = new Rule({
    name: 'all symptoms risks',
    when: [
        (facts) => facts.symptoms
    ],
    then: (facts) => {

        //get the true values from symptom value
        const obj_symptoms = Object.values(facts.symptoms);
        isTrue = obj_symptoms.filter((values) => {
            return values == true
        })

        if (isTrue.length >= 3) {
            symptom_risk_fact = {
                message: facts.result.symptom_result.message = 'jika 4 pernyataan benar, Anda dapat diindikasikan mengidap diabetes.',
                status: facts.result.symptom_result.status = true,
                score: facts.result.symptom_result.score = 20
            }
            return symptom_risk_fact
        } else {
            symptom_risk_fact = {
                message: facts.result.symptom_result.message = 'Anda mungkin tidak menderita diabetes, karena Anda tidak mengidap 4 gejala klasik Diabetes',
                status: facts.result.symptom_result.status = false,
                score: facts.result.symptom_result.score = 0
            }
            return symptom_risk_fact
        }
    }
})

//check if one of the parents has diabetic
var diabetes_parent_risk_fact = ''
const diabetes_parent_risk = new Rule({
    name: 'detecting diabetes if parent',
    when: [
        (facts) => facts.hasDiabetesParent == true || facts.hasDiabetesParent == false
    ],
    then: (facts) => {
        if (facts.hasDiabetesParent == true) {
            diabetes_parent_risk_fact = {
                message: facts.result.parent_risk.message = "Waspadalah, jika orang tua Anda diabetes, maka Anda bisa jadi menderita diabetes ..",
                status: facts.result.parent_risk.status = true,
                score: facts.result.parent_risk.score = 20
            }
            return diabetes_parent_risk_fact
        } else {
            diabetes_parent_risk_fact = {
                message: facts.result.parent_risk.message = "Anda mungkin tidak menderita diabetes",
                status: facts.result.parent_risk.status = false,
                score: facts.result.parent_risk.score = 0
            }
            return diabetes_parent_risk_fact
        }
    }

})

//MED TEST
//DIAGNOSTIC TESTS
//DIAGNOSTIC test Fasting Plasma Glucose 8 hours fasting
// Kadar gula darah normal: di bawah 100 mg/dL
// Pradiabetes: 100-125 mg/dL
// Diabetes di atas 125 mg/dL
var fpg_fact = ''
const fpg = new Rule({
    name: 'detecting fpg glucose',
    when: [
        (facts) => facts.medtest.fpg
    ],
    then: (facts) => {
        if (facts.medtest.fpg >= 125) {
            fpg_fact = {
                message: facts.result.test_result.fpg.message = 'Glukosa di atas normal !. Maaf, Anda menderita diabetes. Segera lakukan checkup',
                status: facts.result.test_result.fpg.status = 2,
                score: facts.result.test_result.fpg.score = 20
            }
            return fpg_fact
        } else if (facts.medtest.fpg >= 100 && facts.medtest.fpg <= 125) {
            fpg_fact = {
                message: facts.result.test_result.fpg.message = 'Hati-Hati! Anda mungkin menderita Diabetes! glukosa antara 100 dan 125 didiagnosis menderita prediabetes',
                status: facts.result.test_result.fpg.status = 1,
                score: facts.result.test_result.fpg.score = 11.67
            }
            return fpg_fact
        } else {
            fpg_fact = {
                message: facts.result.test_result.fpg.message = 'Glukosa yang lebih besar dari sama dengan 60 dan kurang dari 100 adalah normal. Jika di bawah, periksakan ke dokter',
                status: facts.result.test_result.fpg.status = 0,
                score: facts.result.test_result.fpg.score = 0
            }
            return fpg_fact
        }
    }
})


//Diagnostic test Two hours after eating Gula darah 2 jam postprandial 
// Kadar gula darah normal: di bawah 140 mg/dL
// Pradiabetes: 140-199 mg/dL
// Diabetes: lebih dari 200 mg/ dL
var gthae_facts = ''
const gthae = new Rule({
    name: 'glucose two hours after eating',
    when: [
        (facts) => facts.medtest.gthae
    ],
    then: (facts) => {
        if (facts.medtest.gthae >= 200) {
            gthae_facts = {
                message: facts.result.test_result.gthae.message = 'Glukosa di atas normal ! Maaf, Anda menderita diabetes. Segera lakukan checkup',
                status: facts.result.test_result.gthae.status = 2,
                score: facts.result.test_result.gthae.score = 20
            }
            return gthae_facts
        } else if (facts.medtest.gthae >= 140 && facts.medtest.gthae <= 199) {
            gthae_facts = {
                message: facts.result.test_result.gthae.message = 'Hati-Hati! pada tes ini Anda mungkin menderita Diabetes! glukosa antara 140 dan 199 didiagnosis menderita prediabetes',
                status: facts.result.test_result.gthae.status = 1,
                score: facts.result.test_result.gthae.score = 11.67
            }
            return gthae_facts
        } else {
            gthae_facts = {
                message: facts.result.test_result.gthae.message = 'Glukosa di bawah 140 normal.',
                status: facts.result.test_result.gthae.status = 0,
                score: facts.result.test_result.gthae.score = 0
            }
            return gthae_facts
        }
    }

})

var gds_facts = ''
const gds = new Rule({
    name: 'glukosa plasma sewaktu',
    when: [
        (facts) => facts.medtest.gds,
    ],
    then: (facts) => {

        if (facts.medtest.gds >= 200) {
            gds_facts = {
                message: facts.result.test_result.gds.message = 'Glukosa di atas normal ! Maaf, Anda menderita diabetes. Segera lakukan checkup',
                status: facts.result.test_result.gds.status = 2,
                score: facts.result.test_result.gds.score = 20
            }
            return gds_facts
        } else if (facts.medtest.gds >= 140 && facts.medtest.gds <= 199) {
            gds_facts = {
                message: facts.result.test_result.gds.message = 'Hati-Hati! berdasarkan Gula darah sewaktu (GDS) pada tes ini, Anda mungkin menderita Diabetes! glukosa dalam sewaktu (GDS) antara 140 dan 199 didiagnosis menderita Prediabetes',
                status: facts.result.test_result.gds.status = 1,
                score: facts.result.test_result.gds.score = 11.67
            }
            return gds_facts
        } else {
            gds_facts = {
                message: facts.result.test_result.gds.message = 'Glukosa Dalam Sewaktu (GDS) di bawah 140 normal.',
                status: facts.result.test_result.gds.status = 0,
                score: facts.result.test_result.gds.score = 0
            }
            return gds_facts
        }
    }

})


//calculation
const overallResult = new Rule({
    name: 'calculating final result',
    when: [
        (facts) => facts.result.percentage === ''
    ],
    then: (facts) => {
        let calc =
            parseInt(facts.result.symptom_result.score) +
            parseInt(facts.result.parent_risk.score) +
            parseInt(facts.result.test_result.gthae.score) +
            parseInt(facts.result.test_result.gds.score) +
            parseInt(facts.result.test_result.fpg.score);

        // console.log('jangan cepat marah ', calc)

        if (calc >= 80 && calc <= 100) {
            return facts.result.final_result = 'Anda pasti menderita Diabetes! pergi ke dokter!', facts.result.percentage = calc
        } else if (calc >= 40 && calc < 80) {
            return facts.result.final_result = 'Anda mengalami prediabetes, lebih baik pergi ke dokter!', facts.result.percentage = calc
        } else if (calc >= 5 && calc < 40) {
            return facts.result.final_result = 'Anda mungkin mengalami prediabetes, tetapi lebih baik jika memeriksakan diri ke dokter!', facts.result.percentage = calc
        } else {
            return facts.result.final_result = 'Saya harap Anda baik-baik saja !, tetap bugar dan hidup sehat', facts.result.percentage = calc
        }

    }
})

//eval
const evaluation = async () => {
    const rools = new Rools()

    try {
        await rools.register([symptom_risk, fpg, gthae, gds, diabetes_parent_risk, overallResult])
        await rools.evaluate(facts)
        // console.log(await rools.evaluate(facts))
        return facts
        //return console.log(facts)
    } catch (error) {
        //return console.log(error)
        return error
    }
}

//call set paramater function and evaluation functions
const finalresult = async (p, fpg, gthae, s1, s2, s3, s4) => {
    try {
        await getvalues(p, fpg, gthae, s1, s2, s3, s4)
        const res = await evaluation()
        return res
    } catch (error) {
        return error
    }
}

// finalresult(false, 300, 400, true, false, false, false, false, false, false, false, false, false)
module.exports = { finalresult }