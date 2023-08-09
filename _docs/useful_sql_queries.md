## Get table column names for model definition

```
SELECT '"' || column_name || '": "' || udt_name || '",'
FROM information_schema.columns
WHERE table_name = 'tbl_collection';
```