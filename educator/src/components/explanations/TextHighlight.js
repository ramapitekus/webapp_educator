const TextHighlight = (json_url) => {
  let text_alignment_json = null;
  async function load() {
    const start = Date.now();
    text_alignment_json = await fetch(json_url)
      .then((res) => res.json())
      .then((out) => out.fragments);
    console.log(text_alignment_json);
    const end = Date.now();

    const load_diff = end - start;
    console.log(`diff is: ${load_diff}`);
    for (let i = 0; i < text_alignment_json.length; i++) {
      let word = text_alignment_json[i];
      await new Promise((resolve) =>
        setTimeout(resolve, (word.end - word.begin) * 1000 - load_diff)
      );
      console.log(word.lines[0]);
    }
    // text_alignment_json.forEach((word) => {
    //   await new Promise(resolve => setTimeout(resolve, (word.end - word.begin) * 1000));
    //   console.log(word.end);
    // });
  }

  load();
};

export default TextHighlight;
