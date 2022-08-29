// @ts-ignore
export const RPC_REQUEST_SCHEMA = {
    type: "object",
    properties: {
        module: {
            type: "string",
        },
        method: {
            type: "string",
        },
        data: {
            type: ["number", "string", "boolean", "object", "array"],
        },
        bypassCache: {
            type: "boolean",
            nullable: true,
        },
    },
};
