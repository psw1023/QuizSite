let quiz_data = {
    "일본어휘": [
        {"일본어": "青い", "후리가나": "あおい", "한국어": ["푸르다", "파랗다"], "품사": "형용사", "등록일자": "20230201"},
        {"일본어": "赤い", "후리가나": "あかい", "한국어": ["붉다"], "품사": "형용사", "등록일자": "20230201"},
        {"일본어": "黄色い", "후리가나": "きいろい", "한국어": ["노랗다"], "품사": "형용사", "등록일자": "20230201"},
        {"일본어": "nan", "후리가나": "うれしい", "한국어": ["기쁘다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "あたたかい", "한국어": ["따뜻하다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "さむい", "한국어": ["춥다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "あつい", "한국어": ["덥다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "たのしい", "한국어": ["즐겁다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "おもしろい", "한국어": ["재미있다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "いい", "한국어": ["좋다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "よい", "한국어": ["좋다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "むずかしい", "한국어": ["어렵다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "やさしい", "한국어": ["자상하다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "たかい", "한국어": ["비싸다", "높다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "やすい", "한국어": ["싸다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "あまい", "한국어": ["달다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "せまい", "한국어": ["좁다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "きたない", "한국어": ["더럽다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "ひろい", "한국어": ["넓다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "まずい", "한국어": ["맛없다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "ながい", "한국어": ["길다"], "품사": "형용사", "등록일자": "230221"},
    {"일본어": "nan", "후리가나": "つよい", "한국어": ["세다", "강하다"], "품사": "형용사", "등록일자": "230221"}
    ]
    
}



let total_prob_cnt = 0
let cur_prob_no = document.getElementById("prob_no")
let prob = document.getElementById("prob_txt")
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

        for(i in quiz_data["일본어휘"][tmp_cur_no]["한국어"]) {
            console.log(quiz_data["일본어휘"][tmp_cur_no]["한국어"][i])
            if(entered_ans == quiz_data["일본어휘"][tmp_cur_no]["한국어"][i]) {
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

    if(quiz_data["일본어휘"][total_prob_cnt] == null) {
        document.getElementById("ans_blank").value = null
        cur_prob_no.innerText = ""
        prob_hint.innerText = "(후리가나)"
        prob.innerText = "축하합니다! 모든 문제를 맞히셨습니다."
        document.getElementById("ans_blank").readOnly = true
        document.getElementById("site_re_btn").classList.remove("blind")
        return
    }
    document.getElementById("ans_blank").value = null

    cur_prob_no.innerText = total_prob_cnt + "."
    prob.innerText = quiz_data["일본어휘"][total_prob_cnt]["일본어"]
    prob_hint.innerText = quiz_data["일본어휘"][total_prob_cnt]["후리가나"]
}

function fnInCorrectAns() {
    document.getElementById("ans_blank").classList.add("incorrect_ans_bg")
    document.getElementById("site_re_btn").classList.remove("blind")

    cur_prob_no.innerText = ""
    prob_hint.innerText = "(후리가나)"
    prob.innerText = "땡! 틀렸습니다. 처음부터 다시 시작해주시길 바랍니다."
    document.getElementById("ans_blank").value = "정답: " + quiz_data["일본어휘"][total_prob_cnt]["한국어"]
    document.getElementById("ans_blank").readOnly = true
}

function fnLClickStartBtn() {
    console.log("시작 버튼이 클릭되었습니다.")
    fnShuffle(quiz_data["일본어휘"])

    document.getElementById('site_start_btn').classList.add('blind')
    document.getElementById("ans_blank").readOnly = false
    total_prob_cnt += 1

    cur_prob_no.innerText = total_prob_cnt + "."
    prob.innerText = quiz_data["일본어휘"][total_prob_cnt]["일본어"]
    prob_hint.innerText = "  (" + quiz_data["일본어휘"][total_prob_cnt]["후리가나"] + ")"
}

function fnShuffle(arr) {
    arr.sort(() => Math.random() - 0.5)
    arr.splice(0, 0, [])
}