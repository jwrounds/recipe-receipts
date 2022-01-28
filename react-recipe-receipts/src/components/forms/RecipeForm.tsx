import React from 'react';
import { Container, Form, Button, Stack, Col, Row } from 'react-bootstrap';
import '../../App.css';
import { RecipeModel } from '../../models/RecipeModel';
import IngredientList from '../content/IngredientList';
import TitleCard from '../content/TitleCard';

type RecipeFormProps = {
  title: string;
  tagline: string;
  formId: string;
  recipe: RecipeModel;
  onFormSubmit: (e: any) => void;
  onFormChange: (e: any) => void;
}

const RecipeForm = ({ title, tagline, formId, recipe, onFormSubmit, onFormChange}: RecipeFormProps): JSX.Element => {
  return (
    <Container >
      <TitleCard title={title} tagline={tagline}/>
      <Row className="recipe-form">
        <Col sm="auto">
          <h4>Describe your recipe here:</h4>
          <Form id={formId} onSubmit={onFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Recipe Name:</Form.Label>
              <Form.Control type="text" id="name" value={recipe.name} onChange={onFormChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Recipe Description:</Form.Label>
              <Form.Control as="textarea" id="description" rows={3} value={recipe.description} onChange={onFormChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Recipe instructions:</Form.Label>
              <Form.Control as="textarea" id="instructions" rows={6} value={recipe.instructions} onChange={onFormChange}/>
            </Form.Group>

            <Stack direction="horizontal" gap={2}>
              <Form.Group className="mb-3">
                  <Form.Label>Prep Time (minutes):</Form.Label>
                  <Form.Control as="input" type="number" id="prepTimeInMinutes" min="0" max="1000" value={recipe.prepTimeInMinutes} onChange={onFormChange}/>
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Cooking Time (minutes):</Form.Label>
                  <Form.Control as="input" type="number" id="cookTimeInMinutes" min="0" max="1000" value={recipe.cookTimeInMinutes} onChange={onFormChange}/>
              </Form.Group>
            </Stack>
          </Form>
        </Col>

        <Col sm={4}>
          <h4>Add ingredients and measurements:</h4>
          <Form.Group className="mb-3">
            <Form.Label>Ingredient:</Form.Label>
            <Stack direction="horizontal" gap={3}>
              <Form.Control type="text" id="ingredientList" />
              <Button as="input" type="button" variant="secondary" size="sm" id="add" value="Add" onClick={onFormChange}/>
            </Stack>
          </Form.Group>

          <h5>Your ingredients:</h5>
          <IngredientList formIngredients={recipe.ingredientList}> </IngredientList>
        </Col>
      </Row>
      <Row className="submit-container">
        <Button className="form-submit" variant="primary" size="lg" type="submit" form={formId} onSubmit={onFormSubmit}>Save</Button>
      </Row>
    </Container>
  );
}

export default RecipeForm;