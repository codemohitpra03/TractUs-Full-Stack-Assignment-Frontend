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