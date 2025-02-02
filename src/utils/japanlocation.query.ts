const table = 'japan_location';

export const SELECT_ALL_QUERY = `
    SELECT * 
    FROM ${table}
`;

export const SELECT_BY_ID_QUERY = `
    SELECT location_korean_name, location_english_name, location_japan_name
    FROM ${table}
    WHERE location_id = ?
`;