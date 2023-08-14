// IMPORTAÇÃO / URL
const inputBody = {
  url: "https://example.com/some.jpg",
  filename: "some.jpg", // optional
};
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${access_token}`,
};

fetch("https://api.freeconvert.com/v1/process/import/url", {
  method: "POST",
  body: inputBody,
  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });

// CONVERTER 

const inputBody = {
  input: import_task_id,
  input_format: "mp4",
  output_format: "mp3",
  options: {
    // …advanced options…
  },
};
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${access_token}`, // COLOCAR O TOKEN
};

fetch("https://api.freeconvert.com/v1/process/convert", {
  method: "POST",
  body: inputBody,
  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });

// COMPACTAR
const inputBody = {
  input: import_task_id,
  input_format: "jpg",
  options: {
    // …advanced options…
  },
};
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${access_token}`,
};

fetch("https://api.freeconvert.com/v1/process/compress", {
  method: "POST",
  body: inputBody,
  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });



