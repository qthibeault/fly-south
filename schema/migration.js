const schema = {
    "properties": {
        "source": {
            "description": "Host to copy from",
            "type": "string",
            "default": "localhost"
        },
        "target": {
            "description": "Host to copy to",
            "type": "string",
            "default": "localhost"
        },
        "database": {
            "description": "Database to copy",
            "type": "string",
            "required": true
        },
        "rename": {
            "description": "Name of copy target",
            "type": "string",
            "conform": function (rename) {
                const source = prompt.history("source");
                const target = prompt.history("target");
                if(source === target && rename.length < 1)
                    return false;

                return true;
            }
        },
        "username": {
            "description": "Username to authenticate with",
            "type": "string"
        },
        "password": {
            "description": "Password to authenticate with",
            "type": "string",
            "hidden": true,
            "replace": "*"
        }
    }
};

module.exports = schema;