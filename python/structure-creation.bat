@echo off

echo Creating Python module structure...

:: Create main topic folders
mkdir python-basics
mkdir data-structures
mkdir numpy
mkdir pandas
mkdir visualization
mkdir eda
mkdir ml-basics
mkdir projects

:: Python Basics
cd python-basics
type nul > introduction.html
type nul > variables-data-types.html
type nul > operators.html
type nul > control-statements.html
type nul > functions.html
type nul > modules-packages.html
type nul > file-handling.html
type nul > exception-handling.html
cd ..

:: Data Structures
cd data-structures
type nul > lists.html
type nul > tuples.html
type nul > sets.html
type nul > dictionaries.html
type nul > comprehensions.html
type nul > iterators-generators.html
cd ..

:: NumPy
cd numpy
type nul > introduction.html
type nul > ndarray.html
type nul > indexing-slicing.html
type nul > broadcasting.html
type nul > math-operations.html
type nul > linear-algebra.html
cd ..

:: Pandas
cd pandas
type nul > series-dataframe.html
type nul > data-cleaning.html
type nul > missing-data.html
type nul > groupby-aggregation.html
type nul > merge-join.html
type nul > time-series.html
cd ..

:: Visualization
cd visualization
type nul > matplotlib-basics.html
type nul > seaborn.html
type nul > charts.html
type nul > customization.html
type nul > interactive-plots.html
cd ..

:: EDA
cd eda
type nul > understanding-dataset.html
type nul > summary-statistics.html
type nul > correlation-analysis.html
type nul > feature-engineering.html
type nul > outlier-detection.html
cd ..

:: ML Basics
cd ml-basics
type nul > introduction.html
type nul > supervised-vs-unsupervised.html
type nul > regression.html
type nul > classification.html
type nul > model-evaluation.html
type nul > overfitting-underfitting.html
cd ..

:: Projects
cd projects
type nul > data-analysis-project.html
type nul > dashboard.html
type nul > ml-project.html
type nul > deployment.html
cd ..

echo ✅ Structure created successfully!
pause