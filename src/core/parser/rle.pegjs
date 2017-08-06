{
	function makeInteger(list) {  
    	const firstDigit = list[0];
        const restDigits = list[1];
    	const asStr = firstDigit.concat(restDigits.join(""))
    	return parseInt(asStr, 10);
  	}
    
    function fillArray(count, char) {
    	return new Array(count).fill(char)
    }
    
    function flatten(arr) {
    	return arr.reduce((a, acc) => a.concat(acc), []);
    }

    function metaEntry(type, value) {
    	const asText = input => input.join("").trim();
        const textEntry = type => ({ type, value: asText(value) });
        const unknownEntry = () => ({ type: "UNKNOWN" });

    	switch (type) {
        	case "N":
            	return textEntry("NAME");

            case "C":
            case "c":
            	return textEntry("COMMENT");

            case "O":
            	return textEntry("CREATED");

            default:
            	return unknownEntry();
        }
    }

    function rule(born, survive) {
        return { born: born.map(Number), survive: survive.map(Number) }
    }
}

start = rle

rle = m:meta h:header p:pattern {
	return Object.assign({}, m.length ? { meta: m } : {}, h, { pattern: p });
}

header = s:size r:rule? nl+ {
	return Object.assign({}, { size: s }, r ? { rule: r } : {});
}

meta = metaEntry*

metaEntry "# section" = "#" type:. " " value:notnl* nl+ { return metaEntry(type, value); }

size "grid size" = "x" _ "=" _ x:positiveInt headerSep "y" _ "=" _ y:positiveInt _ {
	return { x: x, y: y };
}

rule = headerSep "rule" _ "=" _ rv:ruleVariant { return rv }

ruleVariant = rulev1 / rulev2

rulev1 = [Bb] b:([0-9]+) "/"[sS] s:([0-9]+) { return rule(b, s) }

rulev2 = s:([0-9]+) "/" b:([0-9]+) { return rule(b, s) }

pattern = r1:row* r2:lastRow { return flatten(r1).concat(r2) }

row = c:cells num:positiveInt? rowBreak { return [c].concat(fillArray((num || 1) - 1, [])) }
lastRow = c:cells end { return [c] }

cells = c:multicell+ { return flatten(c) }
multicell = num:positiveInt? c:cell { return fillArray(num || 1, c) }

cell = alive / dead    
positiveInt "positive integer" = num:([1-9][0-9]*) { return makeInteger(num) }    
alive = _"o"_ { return 1 }
dead = _"b"_ { return 0 }
rowBreak = _"$"_
end = _"!"_
headerSep = _ "," _ 
_ "whitespace" = [ \n\t\r]*
nl "newline" = ("\r"?"\n")+
notnl = [^\r\n]
