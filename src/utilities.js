export const deepClone = (obj) => {
	if (Array.isArray(obj)) {
		return obj.map(deepClone)
	} else if (obj && typeof obj === 'object') {
		let cloned = {}

		Object.keys(obj).forEach(key => {
			cloned[key] = deepClone(obj[key])
		})

		return cloned
	} else {
		return obj
	}
}

const operatorToText = (operator) => {
	switch (operator) {
		case OperatorType.EQUAL:
			return "is equal"
		case OperatorType.N_EQUAL:
			return "is not equal"
		case OperatorType.CONTAINS:
			return "contains"
		case OperatorType.N_CONTAINS:
			return "not contains"
		case OperatorType.EMPTY:
			return "is empty"
		case OperatorType.N_EMPTY:
			return "is not empty"
		case OperatorType.BEGINS_WITH:
			return "begins with"
		case OperatorType.ENDS_WITH:
			return "ends with"
		case OperatorType.GREATER:
			return "is greater"
		case OperatorType.GREATER_OR_EQUAL:
			return "is greater or equals"
		case OperatorType.SMALLER:
			return "is smaller"
		case OperatorType.SMALLER_OR_EQUAL:
			return "is smaller or equals"
	}
	return "--- error, not defined ---";
}

export const mapOperators = (operatorsArray) => {
	return operatorsArray.map(x => ({
		text: operatorToText(x),
		value: x
	}))
}

export const RuleTypes = {
	NUMBER: 0,
	TEXT: 1,
	SELECT: 2,
	MULTI_SELECT: 3,
	DATE: 4,
	TIME: 5,
	BOOL: 6,
	AGGREGATE: 7,
	BOOL_INPUT: 8,
	CURRENCY: 9,
}

export const OperatorType = {
	EQUAL: 0,
	N_EQUAL: 1,
	CONTAINS: 2,
	N_CONTAINS: 3,
	EMPTY: 4,
	N_EMPTY: 5,
	BEGINS_WITH: 6,
	ENDS_WITH: 7,
	GREATER: 8,
	GREATER_OR_EQUAL: 9,
	SMALLER: 10,
	SMALLER_OR_EQUAL: 11,
}