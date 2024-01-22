import {
    getMarkForAnnotationID,
    getAnnotationsOnTextNode,
    getAnnotationIdFromMark,
    isAnnotationIDMark
} from "./EditorAnnotationUtils";

it('should return mark for annotation id', () => {
    const id = "01"; //Arrange
    const mark = getMarkForAnnotationID(id); //Act
    expect(mark).toBe("annotation_01"); //Assert
})

it('should return all annotation ids found on a text node', () => {
    const textNode : any = {text: "this text is annotated twice", annotation_01: true, annotation_02: true}; //Arrange
    const annotations = getAnnotationsOnTextNode(textNode); //Act
    expect(annotations.size).toBe(2); //Assert

})

it('should return annotation id of given mark', () => {
    const mark = "annotation_01"; //Arrange
    const id = getAnnotationIdFromMark(mark); //Act
    expect(id).toBe('01'); //Assert
})

it('should throw exception if mark is not of an annotation', () => {
    const mark = "annotationn_01"; //Arrange
    expect(() => getAnnotationIdFromMark(mark)).toThrow(); //Act & Assert
})

it('should return true for mark that is an annotation', () => {
    const mark = 'annotation_01'; //Arrange
    const evaluation = isAnnotationIDMark(mark); //Act
    expect(evaluation).toBe(true); //Assert
})

it('should return false if not mark of annotation', () => {
    const mark = 'annotations_01'; //Arrange
    const evaluation = isAnnotationIDMark(mark); //Act
    expect(evaluation).toBe(false) //Assert
})
