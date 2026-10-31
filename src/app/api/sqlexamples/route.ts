
const dataAsJson = `[
	{
		"dialect": "MySQL",
		"title": "Insert row with immediate values",
		"statement": "INSERT INTO \`Example Table\`\\n(\\n  \`Bounded string\`,\\n  \`Unbounded string\`,\\n  \`Timestamp\`,\\n  \`Floating-point number\`,\\n  \`Fixed-point number\`,\\n  \`Boolean\`\\n)\\nVALUES (\\n  'JSON_OBJECT',\\n  'This is one short but full sentence.',\\n  '1957-08-31 08:30:00',\\n  53.5512,\\n  654321.99,\\n  TRUE\\n);",
		"extra_keywords": "add create new"
	},
	{
		"dialect": "MySQL",
		"title": "Update row with immediate values",
		"statement": "UPDATE \`Example Table\`\\nSET\\n  \`Timestamp\` = '2026-10-30',\\n  \`Fixed-point number\` = 123456.99,\\n  \`Boolean\` = FALSE\\nWHERE TRUE;",
		"extra_keywords": "alter change modify"
	},
	{
		"dialect": "MySQL",
		"title": "Delete row",
		"statement": "DELETE FROM \`Example Table\`\\nWHERE \`Bounded string\` = 'JSON_ARRAY';",
		"extra_keywords": "drop"
	},
	{
		"dialect": "MySQL",
		"title": "Create table",
		"statement": "CREATE TABLE \`Example Table\`\\n(\\n  \`Incrementing ID\` INTEGER PRIMARY KEY AUTO_INCREMENT,\\n  \`Universally unique ID\` VARCHAR(36) DEFAULT (UUID()),\\n  \`Bounded string\` VARCHAR(12),\\n  \`Unbounded string\` TEXT,\\n  \`Timestamp\` DATETIME, \\n  \`Floating-point number\` DOUBLE,\\n  \`Fixed-point number\` NUMERIC(12, 2),\\n  \`Integral number\` INTEGER,\\n  \`Boolean\` BOOLEAN\\n);",
		"extra_keywords": "insert add new"
	},
	{
		"dialect": "MySQL",
		"title": "Delete table",
		"statement": "DROP TABLE \`Example Table\`;",
		"extra_keywords": "drop"
	},
	{
		"dialect": "MySQL",
		"title": "Add column to table",
		"statement": "ALTER TABLE \`Example Table\`\\nADD COLUMN \`JSON document\` JSON;",
		"extra_keywords": "insert create new"
	},
	{
		"dialect": "MySQL",
		"title": "Update column in table",
		"statement": "ALTER TABLE \`Example Table\`\\nMODIFY COLUMN \`JSON document\` JSON DEFAULT ('[]');",
		"extra_keywords": "change modify alter"
	},
	{
		"dialect": "MySQL",
		"title": "Rename column in table",
		"statement": "ALTER TABLE \`Example Table\`\\nRENAME COLUMN \`JSON document\` TO \`JSON value\`;",
		"extra_keywords": "change modify alter update name"
	},
	{
		"dialect": "MySQL",
		"title": "Delete column from table",
		"statement": "ALTER TABLE \`Example Table\`\\nDROP COLUMN \`JSON value\`;",
		"extra_keywords": "drop"
	},
	{
		"dialect": "PostgreSQL",
		"title": "Insert row with immediate values",
		"statement": "INSERT INTO \\"Example Table\\"\\n(\\n  \\"Bounded string\\",\\n  \\"Unbounded string\\",\\n  \\"Timestamp\\",\\n  \\"Floating-point number\\",\\n  \\"Fixed-point number\\",\\n  \\"Boolean\\"\\n)\\nVALUES (\\n  'JSON_OBJECT',\\n  'This is one short but full sentence.',\\n  '1957-08-31 08:30:00',\\n  53.5512,\\n  654321.99,\\n  TRUE\\n);",
		"extra_keywords": "add create new"
	},
	{
		"dialect": "PostgreSQL",
		"title": "Update row with immediate values",
		"statement": "UPDATE \\"Example Table\\"\\nSET\\n  \\"Timestamp\\" = '2026-10-30',\\n  \\"Fixed-point number\\" = 123456.99,\\n  \\"Boolean\\" = FALSE\\nWHERE TRUE;",
		"extra_keywords": "alter change modify"
	},
    {
      "dialect": "PostgreSQL",
      "title": "Delete row",
      "statement": "DELETE FROM \\"Example Table\\"\\nWHERE \\"Bounded string\\" = 'JSON_ARRAY';",
      "extra_keywords": "drop"
    },
    {
      "dialect": "PostgreSQL",
      "title": "Create table",
      "statement": "CREATE TABLE \\"Example Table\\"\\n(\\n  \\"Incrementing ID\\" SERIAL PRIMARY KEY,\\n  \\"Universally unique ID\\" UUID DEFAULT gen_random_uuid(),\\n  \\"Bounded string\\" VARCHAR(12),\\n  \\"Unbounded string\\" TEXT,\\n  \\"Timestamp\\" TIMESTAMP, \\n  \\"Floating-point number\\" DOUBLE PRECISION,\\n  \\"Fixed-point number\\" NUMERIC(12, 2),\\n  \\"Integral number\\" INTEGER,\\n  \\"Boolean\\" BOOLEAN\\n);",
      "extra_keywords": "insert add new"
    },
    {
      "dialect": "PostgreSQL",
      "title": "Delete table",
      "statement": "DROP TABLE \\"Example Table\\";",
      "extra_keywords": "drop"
    },
    {
      "dialect": "PostgreSQL",
      "title": "Add column to table",
      "statement": "ALTER TABLE \\"Example Table\\"\\nADD COLUMN \\"JSON document\\" JSON;",
      "extra_keywords": "insert create new"
    },
    {
      "dialect": "PostgreSQL",
      "title": "Update column in table",
      "statement": "ALTER TABLE \\"Example Table\\"\\nALTER COLUMN \\"JSON document\\" TYPE JSON;\\nALTER TABLE \\"Example Table\\"\\nALTER COLUMN \\"JSON document\\" SET DEFAULT '[]'::json;",
      "extra_keywords": "change modify alter"
    },
    {
      "dialect": "PostgreSQL",
      "title": "Rename column in table",
      "statement": "ALTER TABLE \\"Example Table\\"\\nRENAME COLUMN \\"JSON document\\" TO \\"JSON value\\";",
      "extra_keywords": "change modify alter update name"
    },
    {
      "dialect": "PostgreSQL",
      "title": "Delete column from table",
      "statement": "ALTER TABLE \\"Example Table\\"\\nDROP COLUMN \\"JSON value\\";",
      "extra_keywords": "drop"
    }
]`;

const dataAsJsObject = JSON.parse(dataAsJson);

export async function GET() {
	return Response.json(dataAsJsObject);
}
