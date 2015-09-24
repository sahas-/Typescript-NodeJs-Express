/// <reference path="../appConfig.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />

moment = require('moment');

var action = {
	"create": { "_index": app.indexData.index, "_type": app.indexData.type }
}
var UT_L1 = {
	"level": "L1",
	"questions": [
		{
			"question": "Do you have unit tests ?",
			"status": 0
		},
		{
			"question": "Does the developer who writes code, writes the unit test as well ?",
			"status": 0
		},
		{
			"question": "Are unit tests maintained along with production code change ?",
			"status": 0
		}],

};
var UT_L2 = {
	"level": "L2",
	"questions": [
		{
			"question": "Are unit tests integrated part of CI build ?",
			"status": 0
		},
		{
			"question": "Is your CI build unit test pass rate 100% in last 60 days ?",
			"status": 0
		}
	]
}
var CQ_L1 = {
	"level": "L1",
	"questions": [
		{
			"question": "Do you have code quality metrics thresholds defined?",
			"status": 1
		},
		{
			"question": "Do you have code analysis integration part of build process?",
			"status": 1
		}

	]
}
var CQ_L2 = {
	"level": "L2",
	"questions": [
		{
			"question": "Do you fail the build when code quality SLA is violated?",
			"status": 0
		},
		{
			"question": "Does your team retrospect code quality issues every sprint and take action items to rectify?",
			"status": 1
		}

	]
}

var templateContent =
	{
		"timestamp": moment(),
		"categories": [
			{
				"category": "Unit testing",
				"categoryscore": 1,
				"levels": [
					UT_L1,
					UT_L2
				]
			},
			{
				"category": "Code quality",
				"categoryscore": 1,
				"levels": [
					CQ_L1,
					CQ_L2
				]
			}]
	};



