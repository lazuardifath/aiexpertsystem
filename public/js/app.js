const questionsform = document.querySelector('form')
console.log(questionsform)
//symptoms
const p = document.querySelector('#parent-value')
const fpg = document.querySelector('#fpg')
const gthae = document.querySelector('#gthae')
const s1 = document.querySelector('#s1')
const s2 = document.querySelector('#s2')
const s3 = document.querySelector('#s3')
const s4 = document.querySelector('#s4')

// console.log(p, fpg, gthae, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10)

//to gt the percentage
const result_message = document.querySelector('#results')
//get the pare
const getParentTest = document.querySelector('#ParentTest')
const SymptomsTest = document.querySelector('#SymptomsTest')
const fpgTest = document.querySelector('#fpgTest')
const gthaeTest = document.querySelector('#gthaeTest')
const theFinalResult = document.querySelector('#finalResult')

const expertresult = async (p, fpg, gthae, s1, s2, s3, s4) => {
    result_message.textContent = "..loading .."
    const url = await `evaluation?fpg=${fpg}&dp=${p}&gthae=${gthae}&s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}`
    //const url = await `/evaluation/?dp=true&fpg=890&gthae=140&s1=true&s2=true&s3=false&s4=false&s5=false&s6=false&s7=false&s8=false&s9=false&s10=false`

    if (p === 'Choose...' || fpg == null || gthae == null || s1 == 'Choose...'
        || s2 == 'Choose...' || s3 == 'Choose...' || s4 == 'Choose...') {
        // return result_message.textContent = '.. you must complete all the questions! ..'
        throw new Error('cannot be accepted')
    }

    try {
        const b = await fetch(url)
        return b
    } catch (error) {
        return error

    }
}


questionsform.addEventListener('submit', (e) => {
    e.preventDefault();
    expertresult(p.value, fpg.value, gthae.value, s1.value, s2.value, s3.value, s4.value)
        .then((result) => {
            result.json().then((res) => {
                console.log('here is the result : ', res)
                const data = {
                    percentage: res.result.percentage,
                    final_result: res.result.final_result,
                    summary: {
                        parentTest: res.result.parent_risk.message,
                        symptomTest: res.result.symptom_result.message,
                        fpgTest: res.result.test_result.fpg.message,
                        gthaeTest: res.result.test_result.gthae.message,
                    }
                }

                result_message.textContent = 'Persentase : ' + data.percentage + '%'
                getParentTest.textContent = 'Hasil Tes Diabetes Turunan : ' + data.summary.parentTest
                SymptomsTest.textContent = 'Hasil Uji Gejala : ' + data.summary.symptomTest
                fpgTest.textContent = 'Hasil Tes FBS (Gula Puasa) : ' + data.summary.fpgTest
                gthaeTest.textContent = 'Hasil Tes THPG (Gula 2 jam) : ' + data.summary.gthaeTest
                theFinalResult.textContent = 'Final Conclusion : ' + data.final_result
            })
        })
        .catch((err) => {
            result_message.textContent = '.. you must complete all the questions! ..'
            console.log('this is the error ', err)
        })
})