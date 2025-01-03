const table = 'kanto_location';

export const INSERT_QUERY = `
INSERT INTO ${table} (
    location_id,
    anime_korean_name,
    anime_english_name,
    anime_japan_name,
    anime_scene_number,
    anime_scene,
    real_scene,
    latitude,
    longitude,
    DMS_latitude,
    DMS_longitude
) VALUES (
    ?, ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?
);
`;

export const SELECT_QUERY = `
    SELECT *
    FROM ${table}
`;

export const SELECT_ANIME_QUERY = `
    SELECT *
    FROM ${table}
    WHERE anime_korean_name = ?;
`;