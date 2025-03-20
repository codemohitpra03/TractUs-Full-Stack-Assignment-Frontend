export const CONTRACT_STATUS = {
    DRAFT:'draft',
    FINALIZED: 'finalized',
}

export const CONTRACT_TYPE = {
    TEXT: 'text',
    JSON: 'json',
}

export type ContractStatus = typeof CONTRACT_STATUS[keyof typeof CONTRACT_STATUS];
export type ContractType = typeof CONTRACT_TYPE[keyof typeof CONTRACT_TYPE];

export type ContractItem = {
    contract_id:string;
    client_name:string;
    type: ContractType;
    status: ContractStatus;
    created_at: string;
    updated_at: string;
    contract_data:string;
}

export const SortFields = {
    CLIENT_NAME: 'client_name',
    CREATED_AT: 'created_at',
    LAST_MODIFIED: 'updated_at'
};

export const StatusFields = {
    DRAFT: 'draft',
    FINALIZED: 'finalized',
    BOTH: 'both'
}

export const SortOrderFields = {
    ASC: 'asc',
    DESC: 'desc'
}

export type SortFieldsType = typeof SortFields[keyof typeof SortFields];

export type StatusFieldsType = typeof StatusFields[keyof typeof StatusFields];

export type SortOrderFieldsType = typeof SortOrderFields[keyof typeof SortOrderFields];

export type GetAllContractsQuery = {
    page:number;
    limit:number;
    order: SortOrderFieldsType;
    sortBy:SortFieldsType,
    status : ContractStatus | 'both';
    searchQuery?: string;
}

export type CreateContractBody = {
    client_name:string;
    contract_data:string;
    type: ContractType;
}
export type UpdateContractBody = {
    contract_id:string;
    contract_data?:string | null | undefined;
    type?: ContractType | null | undefined;
}

export const ItemsPerPage = 5 | 10 | 20;