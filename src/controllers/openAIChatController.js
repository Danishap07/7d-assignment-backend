const OpenAI = require('openai');

const openai = new OpenAI();

const openAiChatCompletion = async (req, res) => {
    const question = req.body.question;
    // console.log("question", req.body)

    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": question }],
                // stream: true,
                // max_tokens: 100
            })

        }
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json();
        // console.log("first", data)
        res.status(200).json({status: true, message: data}); 
        // openai.chat.completions.create({
        //     messages: [{ role: "system", content: "You are a helpful assistant." }],
        //     model: "gpt-3.5-turbo-1106",
        //     stream: true,
        //   });
        //   console.log(response);
    } catch (error) {
        console.error(error);
    }
}

module.exports = openAiChatCompletion

// import OpenAI from "openai";

// const openai = new OpenAI();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo-1106",
//   });

//   console.log(completion.choices[0]);
// }

// main();