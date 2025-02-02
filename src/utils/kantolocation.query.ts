const table = 'kanto_location';

export const SELECT_QUERY = `
    SELECT *
    FROM ${table}
`;

export const SELECT_ANIME_QUERY = `
    SELECT *
    FROM ${table}
    WHERE anime_korean_name = ?;
`;