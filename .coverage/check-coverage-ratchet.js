import { existsSync, readFileSync } from 'fs';

const TOLERANCE = 0.01;
const METRICS = [
	'lines',
	'functions',
	'branches',
	'statements',
];

const baselinePath = '.coverage/baseline.json';
const summaryPath = '.coverage/report/coverage-summary.json';

if (!existsSync(summaryPath)) {
	console.error(`Missing ${ summaryPath }. Run "pnpm test:coverage" first.`);
	process.exit(1);
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const { total } = JSON.parse(readFileSync(summaryPath, 'utf8'));

const regressions = METRICS.filter((metric) => {
	return total[metric].pct < baseline[metric] - TOLERANCE;
});

if (regressions.length > 0) {
	regressions.forEach((metric) => {
		console.error(
			`Coverage dropped: ${ metric } is ${ total[metric].pct }%, baseline is ${ baseline[metric] }%.`,
		);
	});
	process.exit(1);
}

console.log('Coverage ratchet passed.');
METRICS.forEach((metric) => {
	console.log(`  ${ metric }: ${ total[metric].pct }% (baseline ${ baseline[metric] }%)`);
});
