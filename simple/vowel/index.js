function vwlCnt() {
    const input = document.getElementById('input').value;
    const result = document.getElementById('result');
    return input.match(/[aeiou]/gi) !== null ? (result.textContent = `Number of Vowels: ${input.match(/[aeiou]/gi).length}`) : (result.textContent = 'Number of Vowels: 0');
}