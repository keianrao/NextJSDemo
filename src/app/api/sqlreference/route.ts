
const dataAsJson = `[
	{
		"dialect": "MySQL",
		"title": "Insert row with immediate values",
		"statement": "INSERT\\nINTO '<table_name>'\\n('<column_1>', '<column_2>')\\nVALUES ('<value_1>', '<value_2>');"
	},
	{
		"dialect": "MySQL",
		"title": "Update row with immediate values",
		"statement": "UPDATE '<table_name>'\\nSET\\n  '<column_1>' = '<value_1>',\\n  '<column_2>' = '<value_2>'\\nWHERE\\n  '<column_1>' = '<value_1>';"
	},
	{
		"dialect": "MySQL",
		"title": "Delete row",
		"statement": "DELETE\\nFROM '<table_name>'\\nWHERE '<column_1>' = '<value_1>';"
	},
	{
		"dialect": "MySQL",
		"title": "Create table",
		"statement": "CREATE\\nTABLE '<table_name>'\\n(\\n  '<column_1>' <type_1>,\\n  '<column_2>' <type_2>\\n);"
	},
	{
		"dialect": "MySQL",
		"title": "Delete table",
		"statement": "DROP\\nTABLE '<table_name>';"
	},
	{
		"dialect": "MySQL",
		"title": "Add column to table",
		"statement": "ALTER\\nTABLE '<table_name>'\\nADD\\nCOLUMN '<column_name>' '<column_type>';"
	},
	{
		"dialect": "MySQL",
		"title": "Update column in table",
		"statement": "ALTER\\nTABLE '<table_name>'\\nMODIFY\\nCOLUMN '<column_name>' '<column_type>';"
	},
	{
		"dialect": "MySQL",
		"title": "Rename column in table",
		"statement": "ALTER\\nTABLE '<table_name>'\\nRENAME\\nCOLUMN '<old_column_name>'\\nTO '<new_column_name>';"
	},
	{
		"dialect": "MySQL",
		"title": "Delete column from table",
		"statement": "ALTER\\nTABLE '<table_name>'\\nDROP\\nCOLUMN '<column_name>';"
	}
]`;

const dataAsJsObject = JSON.parse(dataAsJson);

export async function GET() {
	return Response.json(dataAsJsObject);
}
