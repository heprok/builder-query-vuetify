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
			return "равно"
		case OperatorType.N_EQUAL:
			return "не равно"
		case OperatorType.CONTAINS:
			return "содержит"
		case OperatorType.N_CONTAINS:
			return "не содержит"
		case OperatorType.EMPTY:
			return "пусто"
		case OperatorType.N_EMPTY:
			return "не пуст"
		case OperatorType.BEGINS_WITH:
			return "начинается с"
		case OperatorType.ENDS_WITH:
			return "заканчивается на"
		case OperatorType.GREATER:
			return "больше"
		case OperatorType.GREATER_OR_EQUAL:
			return "больше или равно"
		case OperatorType.SMALLER:
			return "меньше"
		case OperatorType.SMALLER_OR_EQUAL:
			return "меньше или равно"
	}
	return "--- error, not defined ---";
}

export const operatorToSqlOperator = (operator) => {
	switch (operator) {

		case OperatorType.EQUAL:
			return "="
		case OperatorType.N_EQUAL:
			return "<>"
		case OperatorType.CONTAINS:
			return "IN"
		case OperatorType.N_CONTAINS:
			return "NOT IN"
		case OperatorType.EMPTY:
			return "IS NULL"
		case OperatorType.N_EMPTY:
			return "IS NOT NULL"
		case OperatorType.BEGINS_WITH:
			return "%LIKE"
		case OperatorType.ENDS_WITH:
			return "LIKE%"
		case OperatorType.GREATER:
			return ">"
		case OperatorType.GREATER_OR_EQUAL:
			return ">="
		case OperatorType.SMALLER:
			return "<"
		case OperatorType.SMALLER_OR_EQUAL:
			return "<="
	}
	return "--- error, not defined ---";
}

export const mapOperators = (operatorsArray) => {
	return operatorsArray.map(x => ({
		text: operatorToText(x),
		value: operatorToSqlOperator(x)
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