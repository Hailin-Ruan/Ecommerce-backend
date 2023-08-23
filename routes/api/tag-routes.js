const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
  const tagId = req.params.id;
  const tag = await Tag.findByPk(tagId, {
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  });
  if (!tag) {
    res.status(404).json({ message: 'Tag not found' });
    return;
  }
  res.status(200).json(tag); 
} catch (error) {
  res.status(500).json(error);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagId = req.params.is;
    const updatedTag = await Tag.update(req.body, {
      where: { id: tagId },
    });
    if (updatedTag[0] === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
 try {
  const tagId = req.params.id;
  const deltedTag = await Tag.destroy({
    where: { id: tagId },
  });
  if (!deltedTag) {
    res.status(404).json({ message: 'Tag not found' });
    return;
  }
  res.status(200).json({ message: 'Tag updated successfully' });
} catch (error) {
  res.status(500).json(error);
}
});

module.exports = router;
