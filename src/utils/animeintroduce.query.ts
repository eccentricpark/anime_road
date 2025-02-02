const table = 'anime_introduce';

export const SELECT_ALL_QUERY = `
    SELECT anime_korean_name, anime_image, content_korean 
    FROM ${table};
`;

export const SELECT_BY_KOREAN_NAME_QUERY = `
    SELECT anime_korean_name, anime_image, content_korean
    FROM ${table}
    WHERE anime_korean_name LIKE ?;
`;