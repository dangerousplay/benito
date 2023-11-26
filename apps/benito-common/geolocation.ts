

const radius: number = 6371.0; // Earth's radius in kilometers

const fromDegreeToRadian = (deg: number) => deg * Math.PI / 180;

const fromRadianToDegree = (rad: number) => (rad * 180) / Math.PI;

export type Coordinates = {
    lat: number;
    lon: number;
}

/**
 * Calculates the bounding box coordinates based on the center and a given distance.
 *
 * @param {Coordinates} center - The center coordinates.
 * @param {number} d - The radial distance from the center.
 * @return {Coordinates[]} - An array of coordinates representing the bounding box.
 */
export function boundingBox(center: Coordinates, d: number): Coordinates[] {
    const lat: number = fromDegreeToRadian(center.lat);
    const lon: number = fromDegreeToRadian(center.lon);

    const radDist = d / radius; // radial distance

    const minLat: number = lat - radDist;
    const maxLat: number = lat + radDist;

    // difference in longitude
    const deltaLon: number = Math.asin(Math.sin(radDist) / Math.cos(lat));

    // new longitude
    const minLon: number = lon - deltaLon;
    const maxLon: number = lon + deltaLon;

    // convert back to degrees
    const lowerLeft = {
        lat: fromRadianToDegree(minLat),
        lon: fromRadianToDegree(minLon)
    };

    const upperLeft = {
        lat: fromRadianToDegree(maxLat),
        lon: fromRadianToDegree(minLon)
    };

    const lowerRight = {
        lat: fromRadianToDegree(minLat),
        lon: fromRadianToDegree(maxLon)
    };

    const upperRight = {
        lat: fromRadianToDegree(maxLat),
        lon: fromRadianToDegree(maxLon)
    };

    return [lowerLeft, upperLeft, lowerRight, upperRight];
}



/**
 * Computes the bounding box coordinates based on the center point and distance.
 *
 * @param {Coordinates} center - The center point coordinates.
 * @param {number} distance - The distance from the center point to calculate the bounding box.
 * @return {Object} - The bounding box coordinates object.
 *     - min: The minimum lat and lon coordinates of the bounding box.
 *     - max: The maximum lat and lon coordinates of the bounding box.
 */
export function computeBoundingBox(center: Coordinates, distance: number): {[key: string]: Coordinates} {
    let latT = fromDegreeToRadian(center.lat);
    let lonT = fromDegreeToRadian(center.lon);
    let delta = distance / radius;

    let minLat = latT - delta;
    let maxLat = latT + delta;

    let deltaLon = Math.asin(Math.sin(delta) / Math.cos(latT));
    let minLon = lonT - deltaLon;
    let maxLon = lonT + deltaLon;

    return {
        min: { lat: fromRadianToDegree(minLat), lon: fromRadianToDegree(minLon) },
        max: { lat: fromRadianToDegree(maxLat), lon: fromRadianToDegree(maxLon) }
    };
}

/**
 * Calculates the distance between two coordinates in kilometers using the haversine formula.
 * The Haversine formula computes the shortest distance between two sets of GPS coordinates (or points on a sphere).
 * It is named 'Haversine' due to the use of the mathematical function haversine.
 *
 * The formula is as follows:
 * a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)c = 2 ⋅ atan2( √a, √(1−a) ) d = R ⋅ c
 *
 * - φ1 and φ2 are the latitudes of the points in radians, and Δφ is the difference of the latitudes.
 * - λ1 and λ2 are the longitudes of the points in radians, and Δλ is the difference of the longitudes.
 * - R is the radius of Earth.
 * - d assumes the resulting distance.
 *
 * https://en.wikipedia.org/wiki/Haversine_formula
 *
 *
 * @param {Coordinates} coord1 - The first coordinate.
 * @param {Coordinates} coord2 - The second coordinate.
 * @return {number} The distance between the two coordinates in kilometers.
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const lat1Rad = fromDegreeToRadian(coord1.lat);
    const lat2Rad = fromDegreeToRadian(coord2.lat);
    const deltaLat = fromDegreeToRadian(coord2.lat - coord1.lat);
    const deltaLon = fromDegreeToRadian(coord2.lon - coord1.lon);

    const a =
        Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon/2) * Math.sin(deltaLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return radius * c;
}


export function formatDistance(distance: number): string {
    if (distance < 1) {
        return `${Math.ceil(distance * 1000)} M`
    } else {
        return `${Math.floor(distance)} KM`
    }
}


type PlaceDistance = {
    distance?: number
};

export function sortByClosest(places: PlaceDistance[]) {
    return places.sort((a, b) => {
        if (!a.distance)
            return 0;

        if (!b.distance)
            return 0;

        return a.distance > b.distance ? 1 : -1;
    })
}
