
const dataAsJson = `{
	"caveats": [
		{ "dialect": "MySQL", "text": "MySQL uses backticks to escape table and column names." },
		{ "dialect": "MySQL", "text": "MySQL requires expressions for the default value to be wrapped in parentheses." }
	],
	"references": [
		{ "dialect": "MySQL", "link": "https://dev.mysql.com/blog-archive/storing-uuid-values-in-mysql-tables/" },
		{ "dialect": "MySQL", "link": "https://dev.mysql.com/doc/refman/9.7/en/numeric-types.html" },
		{ "dialect": "MySQL", "link": "https://dev.mysql.com/doc/refman/9.7/en/boolean-literals.html" },
		{ "dialect": "MySQL", "link": "https://onecompiler.com/mysql" }
	]
}`;

const dataAsJsObject = JSON.parse(dataAsJson);

export async function GET() {
	return Response.json(dataAsJsObject);
}
