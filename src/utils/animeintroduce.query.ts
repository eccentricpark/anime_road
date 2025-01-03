const table = 'anime_introduce';

export const SELECT_ALL_QUERY = `
    SELECT anime_korean_name, anime_image, content_korean 
    FROM ${table};
`;

export const SELECT_BY_KOREAN_NAME_QUERY = `
    SELECT anime_korean_name, anime_image, content_korean
    FROM ${table}
    WHERE anime_korean_name = REPLACE(?, ' ', '');
`;


export const INSERT_KOREAN_QUERY = `
    INSERT INTO ${table}(
        location_id,
        anime_korean_name,
        content_korean
    ) values(?,?,?);
`;

export const INSERT_KOREAN_BY_FILE_QUERY = `
    INSERT INTO ${table}(
        location_id,
        anime_korean_name,
        anime_english_name,
        anime_japan_name,
        anime_image,
        content_korean,
        content_english,
        content_japan
    ) values(?,?,?,?,?,?,?,?);
`;

export const DELETE_KOREAN_QUERY = `
    DELETE
    FROM ${table}
    WHERE anime_korean_name = ?;
`;