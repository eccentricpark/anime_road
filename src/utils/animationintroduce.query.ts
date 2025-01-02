const table = 'animation_introduce';

export const SELECT_ALL_QUERY = `
    SELECT * 
    FROM ${table};
`;

export const SELECT_BY_KOREAN_NAME_QUERY = `
    SELECT anime_korean_name, content_korean
    FROM ${table}
    WHERE anime_korean_name = ?
`;


export const INSERT_KOREAN_QUERY = `
    INSERT INTO ${table}(
        location_id,
        anime_korean_name,
        content_korean
    ) values(?,?,?);
`;

export const DELETE_KOREAN_QUERY = `
    DELETE
    FROM ${table}
    WHERE anime_korean_name = ?;
`;