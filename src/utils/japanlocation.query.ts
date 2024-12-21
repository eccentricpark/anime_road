export const SELECT_ALL_QUERY = `
    SELECT * 
    FROM japan_location
`;

export const SELECT_BY_ID_QUERY = `
    SELECT location_korean_name, location_english_name, location_japan_name
    FROM japan_location
    WHERE location_id = ?
`;


export const INSERT_QUERY = `
    INSERT INTO japan_location(
        location_id,
        location_korean_name,
        location_english_name,
        location_japan_name
    ) values(?,?,?,?);
`;

export const DELETE_QUERY = `
    DELETE
    FROM japan_location
    WHERE location_id = ?;
`;