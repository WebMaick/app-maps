// Generated by https://quicktype.io

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
function toLugaresResponse(json) {
  return cast(JSON.parse(json), r('LugaresResponse'));
}

function lugaresResponseToJson(value) {
  return JSON.stringify(uncast(value, r('LugaresResponse')), null, 2);
}

function invalidValue(typ, val) {
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ) {
  if (typ.jsonToJS === undefined) {
    var map = {};
    typ.props.forEach((p) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ) {
  if (typ.jsToJSON === undefined) {
    var map = {};
    typ.props.forEach((p) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val, typ, getProps) {
  function transformPrimitive(typ, val) {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val);
  }

  function transformUnion(typs, val) {
    // val must validate against one typ in typs
    var l = typs.length;
    for (var i = 0; i < l; i++) {
      var typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases, val) {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ, val) {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformObject(props, additional, val) {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    var result = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  return transformPrimitive(typ, val);
}

function cast(val, typ) {
  return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
  return transform(val, typ, jsToJSONProps);
}

function a(typ) {
  return { arrayItems: typ };
}

function u(...typs) {
  return { unionMembers: typs };
}

function o(props, additional) {
  return { props, additional };
}

function m(additional) {
  return { props: [], additional };
}

function r(name) {
  return { ref: name };
}

const typeMap = {
  LugaresResponse: o(
    [
      { json: 'type', js: 'type', typ: '' },
      { json: 'query', js: 'query', typ: a('') },
      { json: 'features', js: 'features', typ: a(r('Feature')) },
      { json: 'attribution', js: 'attribution', typ: '' },
    ],
    false
  ),
  Feature: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'type', js: 'type', typ: '' },
      { json: 'place_type', js: 'place_type', typ: a('') },
      { json: 'relevance', js: 'relevance', typ: 0 },
      { json: 'properties', js: 'properties', typ: r('Properties') },
      { json: 'text_es', js: 'text_es', typ: '' },
      { json: 'place_name_es', js: 'place_name_es', typ: '' },
      { json: 'text', js: 'text', typ: '' },
      { json: 'place_name', js: 'place_name', typ: '' },
      { json: 'center', js: 'center', typ: a(3.14) },
      { json: 'geometry', js: 'geometry', typ: r('Geometry') },
      { json: 'context', js: 'context', typ: a(r('Context')) },
    ],
    false
  ),
  Context: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'text_es', js: 'text_es', typ: '' },
      { json: 'text', js: 'text', typ: '' },
      { json: 'wikidata', js: 'wikidata', typ: u(undefined, '') },
      {
        json: 'language_es',
        js: 'language_es',
        typ: u(undefined, r('Language')),
      },
      { json: 'language', js: 'language', typ: u(undefined, r('Language')) },
      { json: 'short_code', js: 'short_code', typ: u(undefined, '') },
    ],
    false
  ),
  Geometry: o(
    [
      { json: 'type', js: 'type', typ: '' },
      { json: 'coordinates', js: 'coordinates', typ: a(3.14) },
    ],
    false
  ),
  Properties: o([{ json: 'accuracy', js: 'accuracy', typ: '' }], false),
  Language: ['es', 'pt'],
};

module.exports = {
  lugaresResponseToJson: lugaresResponseToJson,
  toLugaresResponse: toLugaresResponse,
};
