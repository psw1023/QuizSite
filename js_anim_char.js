let quiz_data = {
    "애니메이션": [
        {"캐릭터이미지": "./img/애니캐릭터_우즈마키나루토.png", "정답": ["나루토", "우즈마키나루토"], "출연작": "나루토"},
        {"캐릭터이미지": "./img/애니캐릭터_몽키D루피.png", "정답": ["루피", "몽키d루피"], "출연작": "원피스"},
        {"캐릭터이미지": "./img/애니캐릭터_프랑키.png", "정답": ["프랑키"], "출연작": "원피스"},
        {"캐릭터이미지": "./img/애니캐릭터_롤로노아조로.png", "정답": ["조로", "롤로노아조로"], "출연작": "원피스"},
        {"캐릭터이미지": "./img/애니캐릭터_나미.png", "정답": ["나미"], "출연작": "원피스"}
    ]
    
}


let total_prob_cnt = 0
let cur_prob_no = document.getElementById("prob_no")
let prob = document.getElementById("prob_txt")
let prob_img = document.getElementById("prob_img")
let prob_hint = document.getElementById("hint_txt")

function fnClickHintCheckBox() {
    let is_show_hint = document.getElementById("hint_check").checked
    if(is_show_hint == true) {
        let tmp_hint_txt = document.getElementById('hint_txt')
        tmp_hint_txt.classList.remove('blind')
    } else {
        let tmp_hint_txt = document.getElementById('hint_txt')
        tmp_hint_txt.classList.add('blind')
    }
}


function fnEnterkey(e) {
    if(e.keyCode == 13) {
        let entered_ans = document.getElementById("ans_blank").value
        let tmp_cur_no = total_prob_cnt

        for(i in quiz_data["애니메이션"][tmp_cur_no]["정답"]) {
            console.log(quiz_data["애니메이션"][tmp_cur_no]["정답"][i])
            if(entered_ans == quiz_data["애니메이션"][tmp_cur_no]["정답"][i]) {
                document.getElementById("ans_blank").classList.add("correct_ans_bg")
                document.getElementById("ans_blank").readOnly = true
                let timer = setTimeout(fnCorrectAns, 500)

                return
            }
        }
        fnInCorrectAns()
    }
}

function fnCorrectAns() {
    document.getElementById("ans_blank").classList.remove("correct_ans_bg")
    document.getElementById("ans_blank").readOnly = false

    total_prob_cnt += 1

    if(quiz_data["애니메이션"][total_prob_cnt] == null) {
        document.getElementById("ans_blank").value = null
        
        prob_img.classList.add("blind")
        cur_prob_no.innerText = ""
        prob_hint.innerText = "(출연작품명)"
        prob.innerText = "축하합니다! 모든 문제를 맞히셨습니다."
        document.getElementById("ans_blank").readOnly = true
        document.getElementById("site_re_btn").classList.remove("blind")
        return
    }
    
    document.getElementById("ans_blank").value = null

    cur_prob_no.innerText = total_prob_cnt + "."
    prob_img.src = quiz_data["애니메이션"][total_prob_cnt]["캐릭터이미지"]
    prob_hint.innerText = "출연작: " + quiz_data["애니메이션"][total_prob_cnt]["출연작"]
}

function fnInCorrectAns() {
    document.getElementById("ans_blank").classList.add("incorrect_ans_bg")
    document.getElementById("site_re_btn").classList.remove("blind")

    prob_img.classList.add("blind")
    cur_prob_no.innerText = ""
    prob_hint.innerText = "(출연작품명)"
    prob.innerText = "땡! 틀렸습니다. 처음부터 다시 시작해주시길 바랍니다."
    document.getElementById("ans_blank").value = "정답: " + quiz_data["애니메이션"][total_prob_cnt]["정답"]
    document.getElementById("ans_blank").readOnly = true
}

function fnLClickStartBtn() {
    console.log("시작 버튼이 클릭되었습니다.")
    fnShuffle(quiz_data["애니메이션"])

    document.getElementById('site_start_btn').classList.add('blind')
    document.getElementById("ans_blank").readOnly = false
    total_prob_cnt += 1

    cur_prob_no.innerText = total_prob_cnt + "."
    prob.innerText = null
    prob_img.src = quiz_data["애니메이션"][total_prob_cnt]["캐릭터이미지"]
    prob_hint.innerText = "출연작: " + quiz_data["애니메이션"][total_prob_cnt]["출연작"]
}

function fnShuffle(arr) {
    arr.sort(() => Math.random() - 0.5)
    arr.splice(0, 0, [])
}