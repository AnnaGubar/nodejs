/*
ТРЕБОВАНИЯ
1. Получает целое положительное число.
2. Возвращает true если год высокосный, и false - если нет.
3. Если получает данные в неправильном формате, выбрасывает ошибку
с соответствующим текстом.

ТЕСТОВАЯ ВЫБОРКА
2008 - true - делится на 4 без остатка
2003 - false - не делится на 4 без остатка
1900 - false - делится на 4 и на 100 без остатка
2000 - true - делится на 4, на 100, на 400 без остатка

ПРЕДПОЛАГАЕМЫЕ ОШИБКИ
41 - error 'year must be 42 or more'
2008.4 - error 'year must be integer'
() - error 'year must be exist'
'2008' - error 'year must be number'
null - error 'year must be number'
false - error 'year must be number'
true - error 'year must be number'
()=> {} - error 'year must be number'
{} - error 'year must be number'
[] - error 'year must be number'
*/

const isLeapYear = require("./isLeapYear"); // файл для тестирования

describe("test isLeapYear function", ()=> {
    test("2008 - true", ()=> {
        const result = isLeapYear(2008);
        expect(result).toBe(true); // result === true
    });

    test("2003 - false", ()=> {
        expect(isLeapYear(2003)).toBe(false);
    })

    // it === test - синонимы
    it("1900 - false", ()=> {
        expect(isLeapYear(1900)).toBe(false);
    })

    test("2000 - true", ()=> {
        expect(isLeapYear(2000)).toBe(true)
    });

    // если мы ждем что выкинет ошибку, expect нужно завернуть в анонимную функ
    test("41 - error 'year must be 42 or more'", ()=> {
        expect(()=> isLeapYear(41)).toThrow('year must be 42 or more');
    })

    test("2008.4 - error 'year must be integer'", ()=> {
        expect(()=> isLeapYear(2008.4)).toThrow('year must be integer');
    })

    test("() - error 'year must be exist'", ()=> {
        expect(()=> isLeapYear()).toThrow('year must be exist');
    });

    test("'2008' - error 'year must be number'", ()=> {
        expect(()=> isLeapYear('2008')).toThrow('year must be number');
    });

    test("null - error 'year must be number'", ()=> {
        expect(()=> isLeapYear(null)).toThrow('year must be number');
    });

    test("false - error 'year must be number'", ()=> {
        expect(()=> isLeapYear(false)).toThrow('year must be number');
    });

    test("true - error 'year must be number'", ()=> {
        expect(()=> isLeapYear(true)).toThrow('year must be number');
    });

    test("()=> {} - error 'year must be number'", ()=> {
        expect(()=> isLeapYear(()=> {})).toThrow('year must be number');
    });

    test("{} - error 'year must be number'", ()=> {
        expect(()=> isLeapYear({})).toThrow('year must be number');
    });

    test("[] - error 'year must be number'", ()=> {
        expect(()=> isLeapYear([])).toThrow('year must be number');
    });

})