const phoneme = {
    "C": ["k", "s", "t", "p", "n", "m", "l", "f", "j", "w"],
    "V": ["a", "i", "u", "e", "o"],
}

function masking(length: number){
    let maskes: number[][] = []
    for (let i=0; i<length; i++){
        for (let j=i+1; j<length; j++){
            maskes.push([i, j])
        }
    }
    return maskes
}

function partLoop(build: string){
    const types = build.split("")

    const lengthes: number[] = types.map(e => {
        return phoneme[e].length
    })
    const minLoop = Math.min(...lengthes)

    let words: string[] = []

    for (let i=1; i<minLoop; i++){
        const loopWord = types.reduce((s, e) => {
            return s + phoneme[e][i]
        }, "")

        words.push(loopWord)
    }
    return words
}

function makeVariation(build: string) {
    const types = build.split("")
    const maskes = masking(types.length)
    const words: string[] = []
    maskes.forEach(e => {
        const took = e.reduce((a, b) => {
            return a + types[b]
        }, "")
        const maskWords: string[] = []
        const parts = partLoop(took)//埋める単語の配列
        parts.forEach(t => {
            let rawWord: string[] = types.map((a) => {
                return phoneme[a][0]
            })
            const letterArr = t.split("")//埋める単語を文字ごとに分割
            letterArr.forEach((l, idx) => {
                rawWord.splice(e[idx], 1, l)
            })
            maskWords.push(rawWord.join(""))
        })
        words.push(...maskWords)
    })
    return words
}

console.log(masking(3))
console.log(makeVariation("CVCVC"))