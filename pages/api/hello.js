// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    switch (req.body.lang) {
        case 'en_US':
            res.status(200).json({ name: 'John Doe' });
    }
};
